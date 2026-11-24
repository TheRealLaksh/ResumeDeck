import { defineConfig, devices } from '@playwright/test';

// End-to-end checks run against the dev server. The share API is always mocked in the tests, so running
// them never writes to the real database. Locally they use the installed Chrome; in CI they use Playwright's Chromium.
const PORT = 5718;

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    viewport: { width: 1280, height: 800 },
    trace: 'retain-on-failure',
    acceptDownloads: true
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 }, ...(process.env.CI ? {} : { channel: 'chrome' }) }
    }
  ],
  webServer: {
    command: `npx vite --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000
  }
});
