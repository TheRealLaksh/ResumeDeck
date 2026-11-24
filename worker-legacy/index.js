const TARGET = 'https://resumedeck-api.lakshpradhwani.com';
const ALLOWED = ['https://profiley.lakshpradhwani.com', 'https://resumedeck.lakshpradhwani.com'];

const corsFor = (origin) =>
  ALLOWED.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ? {
        'access-control-allow-origin': origin,
        'access-control-allow-methods': 'GET, POST, OPTIONS',
        'access-control-allow-headers': 'content-type, authorization',
        'access-control-max-age': '86400',
        vary: 'origin'
      }
    : { vary: 'origin' };

export default {
  async fetch(request) {
    const cors = corsFor(request.headers.get('origin') || '');
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    const headers = new Headers(request.headers);
    headers.delete('origin'); // the real API only trusts its own site; CORS for old callers is added here
    const upstream = await fetch(`${TARGET}${url.pathname}${url.search}`, {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer()
    });
    const out = new Response(upstream.body, upstream);
    Object.entries(cors).forEach(([k, v]) => out.headers.set(k, v));
    return out;
  }
};
