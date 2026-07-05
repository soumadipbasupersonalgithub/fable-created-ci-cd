import { test as base } from '@playwright/test';
import { AppHeader } from '../components/AppHeader';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { standardUser } from '../data/users';

interface PageObjects {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  header: AppHeader;
  /** Logs in as standard_user before the test body runs. */
  loggedIn: void;
}

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  productDetailsPage: async ({ page }, use) => use(new ProductDetailsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutStepOnePage: async ({ page }, use) => use(new CheckoutStepOnePage(page)),
  checkoutStepTwoPage: async ({ page }, use) => use(new CheckoutStepTwoPage(page)),
  checkoutCompletePage: async ({ page }, use) => use(new CheckoutCompletePage(page)),
  header: async ({ page }, use) => use(new AppHeader(page)),
  loggedIn: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.load();
    await loginPage.loginAs(standardUser);
    await inventoryPage.pageTitle.waitFor({ state: 'visible' });
    await use(undefined);
  },
});

export { expect } from '@playwright/test';
