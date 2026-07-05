import { test, expect } from '../src/fixtures/test-fixtures';
import { products } from '../src/data/checkout-data';

test.describe('Navigation and app state - positive flows', () => {
  test.beforeEach(async ({ loggedIn }) => {
    // loggedIn fixture signs in as standard_user
  });

  test('burger menu shows all navigation options', async ({ header }) => {
    await header.openMenu();

    await expect(header.allItemsLink).toBeVisible();
    await expect(header.aboutLink).toBeVisible();
    await expect(header.logoutLink).toBeVisible();
    await expect(header.resetAppStateLink).toBeVisible();
    await expect(header.aboutLink).toHaveAttribute('href', 'https://saucelabs.com/');
  });

  test('"All Items" returns to the inventory from the cart page', async ({
    page,
    header,
    inventoryPage,
  }) => {
    await header.openCart();
    await header.openMenu();
    await header.allItemsLink.click();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('reset app state clears the cart badge', async ({ inventoryPage, header }) => {
    await inventoryPage.addToCart(products.backpack);
    await expect(header.cartBadge).toHaveText('1');

    await header.resetAppState();

    await expect(header.cartBadge).toBeHidden();
  });

  test('footer shows Sauce Labs social links', async ({ page }) => {
    await expect(page.locator('[data-test="social-twitter"]')).toHaveAttribute(
      'href',
      'https://twitter.com/saucelabs',
    );
    await expect(page.locator('[data-test="social-facebook"]')).toHaveAttribute(
      'href',
      'https://www.facebook.com/saucelabs',
    );
    await expect(page.locator('[data-test="social-linkedin"]')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/sauce-labs/',
    );
  });
});
