import { test, expect } from '../src/fixtures/test-fixtures';
import { products } from '../src/data/checkout-data';

test.describe('Product details - positive flows', () => {
  test.beforeEach(async ({ loggedIn }) => {
    // loggedIn fixture signs in as standard_user
  });

  test('opening a product shows its details matching the listing', async ({
    inventoryPage,
    productDetailsPage,
  }) => {
    const listedPrice = await inventoryPage.priceOf(products.backpack);
    await inventoryPage.openProductDetails(products.backpack);

    await expect(productDetailsPage.productName).toHaveText(products.backpack);
    await expect(productDetailsPage.productDescription).not.toBeEmpty();
    await expect(productDetailsPage.productPrice).toHaveText(`$${listedPrice.toFixed(2)}`);
  });

  test('product can be added to the cart from the details page', async ({
    inventoryPage,
    productDetailsPage,
    header,
  }) => {
    await inventoryPage.openProductDetails(products.bikeLight);
    await productDetailsPage.addToCart();

    await expect(productDetailsPage.removeButton).toBeVisible();
    await expect(header.cartBadge).toHaveText('1');
  });

  test('back to products returns to the inventory page', async ({
    page,
    inventoryPage,
    productDetailsPage,
  }) => {
    await inventoryPage.openProductDetails(products.onesie);
    await productDetailsPage.backToProducts();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });
});
