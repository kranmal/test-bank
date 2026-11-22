import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

/** Shared helpers for every page object. Each action waits for its target first. */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async waitForVisible(target: Locator): Promise<void> {
    await expect(target).toBeVisible();
  }

  async click(target: Locator): Promise<void> {
    await this.waitForVisible(target);
    await target.click();
  }

  async fill(target: Locator, value: string): Promise<void> {
    await this.waitForVisible(target);
    await target.fill(value);
  }

  byRole(...args: Parameters<Page['getByRole']>): Locator {
    return this.page.getByRole(...args);
  }

  byText(...args: Parameters<Page['getByText']>): Locator {
    return this.page.getByText(...args);
  }

  heading(name: string | RegExp): Locator {
    return this.page.getByRole('heading', { name });
  }
}
