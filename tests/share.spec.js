import { test, expect } from '@playwright/test';
import { mockShareApi, sampleResume, openTab } from './helpers';

test.describe('creating and managing a link', () => {
  test('create with an expiry, see views, turn it off', async ({ page }) => {
    const calls = await mockShareApi(page, ({ method, path }) => {
      if (method === 'POST' && path === '/api/share') return { status: 201, body: { id: 'my-link', ownerToken: 'owner-secret' } };
      if (path.endsWith('/stats')) return { status: 200, body: { views: 3, revoked: false, expiresAt: null, createdAt: '2026-11-25T00:00:00Z' } };
      if (path.endsWith('/revoke')) return { status: 200, body: { ok: true } };
      return { status: 404, body: {} };
    });

    await page.goto('/');
    await openTab(page, 'Letter');
    await page.getByPlaceholder('Acme Inc.').fill('Secret Corp'); // must never be published
    await openTab(page, 'Export');
    await page.getByRole('button', { name: 'Create link' }).first().click();

    const dialog = page.getByRole('dialog');
    await dialog.getByLabel(/Custom address/).fill('my-link');
    await dialog.getByLabel('Link expires').selectOption('1 day');
    await dialog.getByRole('button', { name: 'Create link' }).click();

    await expect(dialog.getByText(/Stops opening on/)).toBeVisible();
    const created = calls.find((c) => c.method === 'POST' && c.path === '/api/share');
    expect(created.body.slug).toBe('my-link');
    expect(created.body.expiresAt).toBeTruthy();
    expect(JSON.stringify(created.body)).not.toContain('Secret Corp'); // the cover letter is stripped before sharing

    await expect(dialog.getByText('/my-link')).toBeVisible();
    await expect(dialog.getByText(/3 views/)).toBeVisible();

    await dialog.getByRole('button', { name: 'Turn off', exact: true }).click();
    await dialog.getByRole('button', { name: 'Turn off?' }).click();
    await expect(dialog.getByText('Turned off')).toBeVisible();
    const revoke = calls.find((c) => c.path.endsWith('/revoke'));
    expect(revoke.auth).toBe('Bearer owner-secret');
  });

  test('a taken address shows the server message', async ({ page }) => {
    await mockShareApi(page, () => ({ status: 409, body: { error: 'unavailable', message: 'URL unavailable' } }));
    await page.goto('/');
    await openTab(page, 'Export');
    await page.getByRole('button', { name: 'Create link' }).first().click();
    const dialog = page.getByRole('dialog');
    await dialog.getByLabel(/Custom address/).fill('taken');
    await dialog.getByRole('button', { name: 'Create link' }).click();
    await expect(dialog.getByRole('alert')).toHaveText('URL unavailable');
  });
});

test.describe('opening a link', () => {
  test('a live link opens read-only and is kept out of search results', async ({ page }) => {
    await mockShareApi(page, () => ({ status: 200, body: { resume: sampleResume, expiresAt: null } }));
    await page.goto('/priya');
    await expect(page.getByText(/Shared\s*·\s*read only/i).first()).toBeVisible();
    await expect(page).toHaveTitle('Priya Raman - Resume');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  });

  test('an expired link shows a notice and no resume', async ({ page }) => {
    await mockShareApi(page, () => ({ status: 410, body: { error: 'expired' } }));
    await page.goto('/old');
    await expect(page.getByRole('heading', { name: 'This link has expired' })).toBeVisible();
    await expect(page.getByText('Priya Raman')).toHaveCount(0);
  });

  test('a turned-off link shows its own notice', async ({ page }) => {
    await mockShareApi(page, () => ({ status: 410, body: { error: 'revoked' } }));
    await page.goto('/off');
    await expect(page.getByRole('heading', { name: 'This link was turned off' })).toBeVisible();
  });

  test('an unknown link falls back to the editor', async ({ page }) => {
    await mockShareApi(page, () => ({ status: 404, body: { error: 'not_found' } }));
    await page.goto('/nope');
    await expect(page.getByText('Resume not found. Opening the editor.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your resume' })).toBeVisible();
  });

  test('a network failure says so instead of claiming the link is missing', async ({ page }) => {
    await page.route('**/api/share**', (route) => route.abort());
    await page.goto('/flaky');
    await expect(page.getByText(/Couldn't load that resume/)).toBeVisible();
  });
});
