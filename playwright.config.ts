import { defineConfig, devices } from '@playwright/test';
import { config, timeouts } from './config/env';

export default defineConfig({
  testDir: './tests',
  timeout: timeouts.test,
  expect: { timeout: timeouts.expect },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3, // 2-4 workers (decision 12)
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,
  outputDir: 'test-results',
  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
  ],
  use: {
    baseURL: config.baseUrl,
    actionTimeout: timeouts.action,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Serves the local copy of the app. Reuses a server that is already running.
  webServer: {
    command: 'python3 -m http.server 8770',
    cwd: 'app-under-test',
    url: config.baseUrl,
    reuseExistingServer: true,
    timeout: 15_000,
  },
});
