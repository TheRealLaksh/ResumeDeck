// Shared helpers. The share API is mocked so tests never touch the real database.

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type, authorization',
  'access-control-allow-methods': 'GET, POST, OPTIONS'
};

/**
 * Routes every /api/share call to `handler(request) -> { status, body }`.
 * Answers CORS preflights itself and records each call in the returned `calls` array.
 */
export const mockShareApi = async (page, handler) => {
  const calls = [];
  await page.route('**/api/share**', async (route) => {
    const req = route.request();
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const url = new URL(req.url());
    let body = null;
    try { body = req.postDataJSON(); } catch { /* no body */ }
    const call = { method: req.method(), path: url.pathname, body, auth: req.headers().authorization || '' };
    calls.push(call);
    const { status, body: out } = await handler(call);
    return route.fulfill({ status, headers: { ...CORS, 'content-type': 'application/json' }, body: JSON.stringify(out ?? {}) });
  });
  return calls;
};

export const sampleResume = {
  data: { personal: { name: 'Priya Raman', title: 'Frontend Developer' }, experience: [], education: [], skills: [] },
  config: {},
  sectionOrder: []
};

export const paper = (page) => page.locator('[data-resume-paper="main"]').first();

export const openTab = (page, name) => page.getByRole('tab', { name }).click();
