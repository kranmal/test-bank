import { test, expect } from '../../src/fixtures';
import { LoginPage } from '../../src/pages/LoginPage';
import { loadData, type LoginCase } from '../../src/utilities/dataLoader';

const cases = loadData<LoginCase[]>('login-cases.json');

for (const c of cases) {
  test(`an invalid log on shows an error for ${c.name}`, async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.logOn(c.username, c.password);
    await expect(login.errorMessage).toHaveText(c.expectedError);
  });
}
