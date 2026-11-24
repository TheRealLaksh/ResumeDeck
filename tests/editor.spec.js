import { test, expect } from '@playwright/test';
import { openTab, paper } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Your resume' })).toBeVisible();
});

test('opens with the sample resume and autosaves in this browser', async ({ page }) => {
  await expect(paper(page)).toContainText('Laksh Pradhwani');
  await expect.poll(() => page.evaluate(() => Boolean(localStorage.getItem('profiley_data')))).toBe(true);
});

test.describe('saved resumes', () => {
  const switcher = (page) => page.getByRole('button', { name: /Switch resume/ });

  test('new, duplicate, switch, rename and delete', async ({ page }) => {
    await switcher(page).click();
    await page.getByRole('menuitem', { name: 'New' }).click();
    await expect(page.locator('header').first()).toContainText('Untitled resume');
    await expect(switcher(page)).toHaveAccessibleName(/Resume 2/);

    // The first resume is untouched and switching back restores it.
    await switcher(page).click();
    await page.getByRole('menuitemradio', { name: 'My resume' }).click();
    await expect(paper(page)).toContainText('Laksh Pradhwani');

    await switcher(page).click();
    await page.getByRole('menuitem', { name: 'Duplicate' }).click();
    await expect(switcher(page)).toHaveAccessibleName(/My resume copy/);
    await expect(paper(page)).toContainText('Laksh Pradhwani');

    await switcher(page).click();
    await page.getByRole('button', { name: 'Rename My resume copy' }).click();
    await page.getByLabel('Resume name').fill('Internship');
    await page.getByLabel('Resume name').press('Enter');
    // The menu stays open after renaming.
    await expect(page.getByRole('menuitemradio', { name: 'Internship' })).toBeVisible();

    // Delete needs a second click, then the app falls back to another resume.
    await page.getByRole('button', { name: 'Delete Internship' }).click();
    await page.getByRole('button', { name: 'Delete?' }).click();
    await expect(switcher(page)).not.toHaveAccessibleName(/Internship/);
    await expect
      .poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('profiley_library')).items.map((i) => i.name)))
      .toEqual(['My resume', 'Resume 2']);
  });

  test('the original draft keeps its original storage keys', async ({ page }) => {
    await expect
      .poll(() => page.evaluate(() => Object.keys(localStorage)))
      .toEqual(expect.arrayContaining(['profiley_data', 'profiley_config', 'profiley_order']));
  });
});

test.describe('cover letter', () => {
  test('starter draft and pasted Claude reply show on the letter page', async ({ page }) => {
    await openTab(page, 'Letter');
    await page.getByPlaceholder('Acme Inc.').fill('Acme Inc.');
    await page.getByPlaceholder('Frontend Intern').fill('Frontend Intern');
    await page.getByRole('button', { name: 'Starter draft' }).click();
    await expect(paper(page)).toContainText('Dear Hiring Manager,');
    await expect(paper(page)).toContainText('the Frontend Intern role at Acme Inc.');

    await page.getByPlaceholder('Paste the reply here').fill('Dear Hiring Manager,\n\nI built Calibridge with 43 tests.\n\nSincerely,\nLaksh Pradhwani');
    await page.getByRole('button', { name: 'Use reply' }).click();
    await expect(paper(page)).toContainText('I built Calibridge with 43 tests.');
    // The greeting and sign-off in the reply are dropped; the page adds exactly one of each.
    const text = await paper(page).innerText();
    expect(text.match(/Dear Hiring Manager,/g)).toHaveLength(1);
    expect(text.match(/Sincerely,/g)).toHaveLength(1);
  });

  test('downloads a cover letter PDF', async ({ page }) => {
    await openTab(page, 'Letter');
    await page.getByRole('button', { name: 'Starter draft' }).click();
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download letter PDF' }).click();
    expect((await download).suggestedFilename()).toMatch(/Cover_Letter\.pdf$/);
  });

  test('the letter is saved with the resume but kept out of a published copy', async ({ page }) => {
    await openTab(page, 'Letter');
    await page.getByPlaceholder('Acme Inc.').fill('Secret Corp');
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('profiley_data')).letter?.company)).toBe('Secret Corp');
  });
});

test.describe('keyword gap', () => {
  test('shows coverage and adds a missing skill with one click', async ({ page }) => {
    await openTab(page, 'Review');
    await page.getByRole('button', { name: 'Keywords', exact: true }).click();
    await page.getByPlaceholder(/Paste the job post/).fill(
      'We need a Full Stack Engineer with React, TypeScript and Node.js. You will build REST APIs, work with PostgreSQL and AWS, and deploy with Docker and CI/CD pipelines. GraphQL is a plus.'
    );
    await expect(page.getByText('Keyword coverage').first()).toBeVisible();
    await expect(page.getByText('Missing from your resume')).toBeVisible();

    await page.getByRole('button', { name: 'Add TypeScript to Skills' }).click();
    await expect(page.getByRole('button', { name: 'Add TypeScript to Skills' })).toHaveCount(0);
    await expect
      .poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('profiley_data')).skills.map((s) => s.name ?? s)))
      .toContain('TypeScript');
  });

  test('does not match "js" inside "Node.js" or the word "rest"', async ({ page }) => {
    await openTab(page, 'Review');
    await page.getByRole('button', { name: 'Keywords', exact: true }).click();
    await page.getByPlaceholder(/Paste the job post/).fill('The rest of the team uses Node.js every day and values clear communication across the whole company.');
    await expect(page.getByText('Missing from your resume')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add JavaScript to Skills' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Add REST APIs to Skills' })).toHaveCount(0);
  });
});

test('downloads the resume PDF', async ({ page }) => {
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download PDF' }).first().click();
  expect((await download).suggestedFilename()).toMatch(/_Resume\.pdf$/);
});

test('reminds you once to download a backup when there is real content', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Your resume' })).toBeVisible();
  await page.clock.fastForward(21_000);
  await expect(page.getByText(/Download a backup file\?/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download backup' })).toBeVisible();
});
