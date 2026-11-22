import { test, expect } from '../../src/fixtures';
import { LoginPage } from '../../src/pages/LoginPage';
import { OverviewPage } from '../../src/pages/OverviewPage';
import { config } from '../../config/env';

test('a registered customer can log on and see their accounts overview', async ({ page, log }) => {
  const login = new LoginPage(page);
  const overview = new OverviewPage(page);

  await test.step('open the log on page', async () => {
    log.info('opening home page');
    await login.open();
  });
  await test.step('log on with the demo customer', async () => {
    await login.logOn(config.username, config.password);
  });
  await test.step('see the accounts overview', async () => {
    await expect(overview.accountCards.first()).toBeVisible();
  });
});
