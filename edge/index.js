// Cloudflare Worker for the ResumeDeck site. Static files (the built app in /dist) are served by Workers Assets with
// single-page-app fallback; this script only runs for /api/* (see wrangler.toml, run_worker_first).
//
//   GET  /api/ai                 -> { configured: boolean }
//   POST /api/ai {task, payload} -> { result }
//
// Configure with the ANTHROPIC_API_KEY secret (wrangler secret put ANTHROPIC_API_KEY). It is deliberately NOT set,
// so the built-in assistant stays off and Job match uses the free copy-paste mode.
// Optional vars: ANTHROPIC_MODEL (default claude-opus-5-5), AI_RATE_LIMIT_PER_HOUR (default 8).
//
// Safeguards: same-origin only, prompts are built server-side (see src/ai/tasks.js), input sizes are capped,
// and requests are rate limited per IP. The in-memory limiter is per isolate, so it slows abuse without being a hard cap.

import Anthropic from '@anthropic-ai/sdk';
import { DEFAULT_MODEL, TASKS, AiInputError, readModelJson, toMessageParams } from '../src/ai/tasks.js';

const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map();

const rateLimit = (ip, limit) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= limit) {
    hits.set(ip, recent);
    return Math.ceil((WINDOW_MS - (now - recent[0])) / 60000);
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const key of hits.keys()) { hits.delete(key); if (hits.size < 2500) break; }
  return 0;
};

const send = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const sameOrigin = (request) => {
  const origin = request.headers.get('origin');
  if (!origin) return true; // same-origin GETs and non-browser clients send none
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
};

const handleAi = async (request, env) => {
  if (!sameOrigin(request)) return send(403, { error: { code: 'forbidden', message: 'Cross-origin requests are not allowed.' } });

  const apiKey = env.ANTHROPIC_API_KEY;
  if (request.method === 'GET') return send(200, { configured: Boolean(apiKey) });
  if (request.method !== 'POST') return send(405, { error: { code: 'method', message: 'Use POST.' } });
  if (!apiKey) return send(501, { error: { code: 'not_configured', message: 'The built-in assistant is not set up on this site.' } });

  let body = null;
  try { body = await request.json(); } catch { /* handled below as an unknown task */ }
  const build = TASKS[body?.task];
  if (!build) return send(400, { error: { code: 'bad_request', message: 'Unknown task.' } });

  let aiRequest;
  try {
    aiRequest = build(body.payload);
  } catch (error) {
    if (error instanceof AiInputError) return send(400, { error: { code: 'bad_request', message: error.message } });
    throw error;
  }

  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const waitMinutes = rateLimit(ip, Number(env.AI_RATE_LIMIT_PER_HOUR) || 8);
  if (waitMinutes) {
    return send(429, { error: { code: 'rate_limited', message: `You've used the free assistant a lot. Try again in about ${waitMinutes} minutes, or add your own API key.` } });
  }

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create(toMessageParams(aiRequest, env.ANTHROPIC_MODEL || DEFAULT_MODEL));
    return send(200, { result: readModelJson(message) });
  } catch (error) {
    if (error?.code === 'refused' || error?.code === 'truncated' || error?.code === 'failed') {
      return send(502, { error: { code: error.code, message: error.message } });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return send(429, { error: { code: 'rate_limited', message: 'The assistant is busy right now. Please try again in a minute.' } });
    }
    if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) {
      console.error('Anthropic credentials rejected');
      return send(502, { error: { code: 'server_misconfigured', message: 'The assistant is temporarily unavailable.' } });
    }
    console.error('AI request failed', error?.status, error?.message);
    return send(502, { error: { code: 'failed', message: 'The assistant could not finish. Please try again.' } });
  }
};

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/ai') return handleAi(request, env);
    if (pathname.startsWith('/api/')) return send(404, { error: { code: 'not_found', message: 'Not found.' } });
    return env.ASSETS.fetch(request); // not reached for other paths: assets are served before the Worker runs
  }
};
