import { test, expect } from '../../src/fixtures';
import { LoginPage } from '../../src/pages/LoginPage';
import { OverviewPage } from '../../src/pages/OverviewPage';

test('a logged-in customer who logs off is returned to the log on page', async ({ loggedInPage }) => {
  const overview = new OverviewPage(loggedInPage);
  const login = new LoginPage(loggedInPage);

  await overview.waitForVisible(overview.greeting);
  await overview.logOff();

  await expect(login.form).toBeVisible();
});
