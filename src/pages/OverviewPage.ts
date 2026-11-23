import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** The accounts overview shown after logging on. */
export class OverviewPage extends BasePage {
  readonly greeting: Locator;
  readonly logOffLink: Locator;
  readonly accountCards: Locator;
  readonly totalRow: Locator;

  constructor(page: Page) {
    super(page);
    this.greeting = page.locator('.greet');
    this.logOffLink = page.getByRole('link', { name: 'Log off' });
    this.accountCards = page.locator('.acct');
    this.totalRow = page.locator('.total');
  }

  async open(): Promise<void> {
    await this.goto('/#/overview');
    await this.waitForVisible(this.greeting);
  }

  async logOff(): Promise<void> {
    await this.click(this.logOffLink);
  }
}
