import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** The home page "Log on" form. Its labels are not linked to the inputs, so fields are found by name. */
export class LoginPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  readonly errorMessage: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('#loginForm input[name="u"]');
    this.password = page.locator('#loginForm input[name="p"]');
    this.submit = page.locator('#loginForm').getByRole('button', { name: 'Log on' });
    this.errorMessage = page.locator('#lerr');
    this.form = page.locator('#loginForm');
  }

  async open(): Promise<void> {
    await this.goto('/#/home');
    await this.waitForVisible(this.username);
  }

  async logOn(username: string, password: string): Promise<void> {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.submit);
  }
}
