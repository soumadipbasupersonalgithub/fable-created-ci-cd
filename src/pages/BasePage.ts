import { Locator, Page } from '@playwright/test';

/**
 * Common behaviour shared by every Swag Labs page.
 */
export abstract class BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
