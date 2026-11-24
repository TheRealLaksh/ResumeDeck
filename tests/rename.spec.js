import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import redirectWorker from '../redirect/src/index.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const OLD = 'https://profiley.lakshpradhwani.com';
const NEW = 'https://resumedeck.lakshpradhwani.com';

test.describe('old address redirect worker', () => {
  const call = (url, headers = {}) => redirectWorker.fetch(new Request(url, { headers, redirect: 'manual' }));

  test('every path is permanently redirected, keeping path and query', async () => {
    const res = await call(`${OLD}/priya?view=creative`, { accept: 'text/html' });
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe(`${NEW}/priya?view=creative`);
    expect((await call(`${OLD}/laksh`)).headers.get('location')).toBe(`${NEW}/laksh`);
    expect((await call(`${OLD}/sitemap.xml`)).status).toBe(301);
  });

  test('crawlers and link previews get a plain 301 on the home page too', async () => {
    for (const ua of ['Googlebot/2.1', 'facebookexternalhit/1.1', 'WhatsApp/2.23', 'LinkedInBot/1.0']) {
      const res = await call(`${OLD}/`, { accept: 'text/html', 'user-agent': ua });
      expect(res.status, ua).toBe(301);
      expect(res.headers.get('location')).toBe(`${NEW}/`);
    }
  });

  test('people get the hand-over page that moves their saved drafts', async () => {
    const res = await call(`${OLD}/`, { accept: 'text/html', 'user-agent': 'Mozilla/5.0 Chrome/120' });
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain('ResumeDeck');
    expect(html).toContain('noindex');
  });
});

test('saved drafts move from the old address to the new one, once, without overwriting', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const transferHtml = fs.readFileSync(path.join(here, '../public/transfer.html'), 'utf8');
  const handoff = await (await redirectWorker.fetch(new Request(`${OLD}/`, { headers: { accept: 'text/html', 'user-agent': 'Mozilla/5.0 Chrome/120' } }))).text();

  await page.route(`${OLD}/**`, (route) => {
    const p = new URL(route.request().url()).pathname;
    return route.fulfill({ status: 200, contentType: 'text/html', body: p === '/' ? handoff : '<!doctype html><title>old</title>' });
  });
  await page.route(`${NEW}/**`, (route) => {
    const p = new URL(route.request().url()).pathname;
    return route.fulfill({ status: 200, contentType: 'text/html', body: p === '/transfer' ? transferHtml : '<!doctype html><title>new home</title>' });
  });

  // Seed the old address with a draft, a resume library and an unrelated key.
  await page.goto(`${OLD}/seed`);
  await page.evaluate(() => {
    localStorage.setItem('profiley_data', JSON.stringify({ personal: { name: 'Priya' } }));
    localStorage.setItem('profiley_library', '{"activeId":"main"}');
    localStorage.setItem('other_site_key', 'nope');
  });

  // Visiting the old home page hands everything over and lands on the new address.
  await page.goto(`${OLD}/`);
  await page.waitForURL(`${NEW}/`);
  const moved = await page.evaluate(() => ({ ...localStorage }));
  expect(JSON.parse(moved.resumedeck_data).personal.name).toBe('Priya');
  expect(moved.resumedeck_library).toBe('{"activeId":"main"}');
  expect(Object.keys(moved).some((k) => k.startsWith('profiley_') || k === 'other_site_key')).toBe(false);

  // A second visit never overwrites what the new address already holds.
  await page.evaluate(() => localStorage.setItem('resumedeck_data', '{"personal":{"name":"Edited on new"}}'));
  await page.goto(`${OLD}/`);
  await page.waitForURL(`${NEW}/`);
  expect(await page.evaluate(() => localStorage.getItem('resumedeck_data'))).toBe('{"personal":{"name":"Edited on new"}}');
  await context.close();
});

test('the transfer page only accepts messages from the old address', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const transferHtml = fs.readFileSync(path.join(here, '../public/transfer.html'), 'utf8');
  await context.route('https://evil.example/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>evil</title>' }));
  await page.route(`${NEW}/**`, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: new URL(route.request().url()).pathname === '/transfer' ? transferHtml : '<!doctype html><title>new</title>' }));

  await page.goto(`${NEW}/transfer`);
  const evil = await context.newPage();
  await evil.goto('https://evil.example/');
  await evil.evaluate((target) => {
    const f = document.createElement('iframe');
    f.src = `${target}/transfer`;
    document.body.appendChild(f);
    return new Promise((resolve) => f.addEventListener('load', () => {
      f.contentWindow.postMessage({ type: 'resumedeck-transfer', items: { profiley_data: 'stolen' } }, '*');
      resolve();
    }));
  }, NEW);
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => localStorage.getItem('resumedeck_data'))).toBeNull();
  await context.close();
});

test('older backups made as "Profiley" can still be imported', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Import' }).click();
  const legacy = { app: 'profiley', version: 1, data: { personal: { name: 'Old Backup Person', title: 'Tester' }, experience: [], education: [], skills: [] }, config: {}, sectionOrder: [] };
  await page.locator('input[type=file]').setInputFiles({ name: 'resume.profiley.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(legacy)) });
  await page.getByRole('button', { name: 'Replace my resume' }).click();
  await expect(page.locator('[data-resume-paper="main"]').first()).toContainText('Old Backup Person');
});

test('the app says ResumeDeck and never Profiley', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ResumeDeck/);
  await expect(page.getByRole('img', { name: 'ResumeDeck' }).first()).toBeVisible();
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/profiley/i);
});
