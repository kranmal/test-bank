import { test as base, expect, type Page } from '@playwright/test';
import { config } from '../config/env';
import { createLogger, type Logger } from './utilities/logger';

// The app keeps all its data, including the login session, in localStorage under this key.
const STORAGE_KEY = 'pb_replica_v3';

/** Open the app, then mark the demo user as logged in, without using the login screen. */
async function seedSession(page: Page, username: string): Promise<void> {
  await page.goto('/');
  await page.evaluate(
    ([key, user]) => {
      const db = JSON.parse(localStorage.getItem(key) ?? '{}');
      db.session = user;
      localStorage.setItem(key, JSON.stringify(db));
    },
    [STORAGE_KEY, username],
  );
  await page.goto('/#/overview');
  await page.reload();
}

type Fixtures = {
  /** A page that is already logged in (mocked/seeded auth, decision 15). */
  loggedInPage: Page;
  /** Structured logger already tagged with the current test's title. */
  log: Logger;
};

export const test = base.extend<Fixtures>({
  log: async ({}, use, testInfo) => {
    await use(createLogger(testInfo.title));
  },
  loggedInPage: async ({ page }, use) => {
    await seedSession(page, config.username);
    await use(page);
  },
});

export { expect };
