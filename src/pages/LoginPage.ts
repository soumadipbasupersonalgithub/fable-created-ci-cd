import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Credentials } from '../data/users';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.logo = page.locator('.login_logo');
  }

  async load(): Promise<void> {
    await this.goto('/');
  }

  async loginAs(user: Credentials): Promise<void> {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}
