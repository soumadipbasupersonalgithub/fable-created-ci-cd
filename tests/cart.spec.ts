import { test, expect } from '../src/fixtures/test-fixtures';
import { products } from '../src/data/checkout-data';

test.describe('Cart - positive flows', () => {
  test.beforeEach(async ({ loggedIn }) => {
    // loggedIn fixture signs in as standard_user
  });

  tes('adding products updates the cart badge and swaps the button to Remove', async ({
    inventoryPage,
    header,
  }) => {
    await inventoryPage.addToCart(products.backpack);
    await expect(header.cartBadge).toHaveText('1');
    await expect(inventoryPage.removeButton(products.backpack)).toBeVisible();

    await inventoryPage.addToCart(products.boltTShirt);
    await expect(header.cartBadge).toHaveText('2');
  });

  test('cart page lists every added product', async ({ inventoryPage, header, cartPage }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.fleeceJacket);
    await header.openCart();

    await expect(cartPage.pageTitle).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(2);
    expect(await cartPage.getItemNames()).toEqual(
      expect.arrayContaining([products.backpack, products.fleeceJacket]),
    );
  });

  test('removing a product from the cart updates the list and badge', async ({
    inventoryPage,
    header,
    cartPage,
  }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await header.openCart();

    await cartPage.removeItem(products.backpack);

    await expect(cartPage.cartItems).toHaveCount(1);
    expect(await cartPage.getItemNames()).toEqual([products.bikeLight]);
    await expect(header.cartBadge).toHaveText('1');
  });

  test('continue shopping returns to inventory and keeps the cart contents', async ({
    page,
    inventoryPage,
    header,
    cartPage,
  }) => {
    await inventoryPage.addToCart(products.redTShirt);
    await header.openCart();
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(header.cartBadge).toHaveText('1');
  });
});
