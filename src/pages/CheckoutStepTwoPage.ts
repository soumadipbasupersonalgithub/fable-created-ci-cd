import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  private async moneyFrom(locator: Locator): Promise<number> {
    const text = (await locator.textContent()) ?? '';
    const match = text.match(/\$([\d.]+)/);
    return match ? Number(match[1]) : NaN;
  }

  async getSubtotal(): Promise<number> {
    return this.moneyFrom(this.subtotalLabel);
  }

  async getTax(): Promise<number> {
    return this.moneyFrom(this.taxLabel);
  }

  async getTotal(): Promise<number> {
    return this.moneyFrom(this.totalLabel);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
