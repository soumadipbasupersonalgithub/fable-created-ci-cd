import { test, expect } from '../src/fixtures/test-fixtures';
import { defaultCheckoutInfo, products } from '../src/data/checkout-data';

test.describe('Checkout - positive flows', () => {
  test.beforeEach(async ({ loggedIn }) => {
    // loggedIn fixture signs in as standard_user
  });

  test('user can complete an end-to-end purchase of two products', async ({
    page,
    inventoryPage,
    header,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    const backpackPrice = await inventoryPage.priceOf(products.backpack);
    const bikeLightPrice = await inventoryPage.priceOf(products.bikeLight);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await header.openCart();
    await cartPage.checkout();

    await expect(checkoutStepOnePage.pageTitle).toHaveText('Checkout: Your Information');
    await checkoutStepOnePage.fillInfoAndContinue(defaultCheckoutInfo);

    await expect(checkoutStepTwoPage.pageTitle).toHaveText('Checkout: Overview');
    expect(await checkoutStepTwoPage.getItemNames()).toEqual(
      expect.arrayContaining([products.backpack, products.bikeLight]),
    );

    const subtotal = await checkoutStepTwoPage.getSubtotal();
    const tax = await checkoutStepTwoPage.getTax();
    const total = await checkoutStepTwoPage.getTotal();
    expect(subtotal).toBeCloseTo(backpackPrice + bikeLightPrice, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);

    await checkoutStepTwoPage.finish();

    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.ponyExpressImage).toBeVisible();

    await checkoutCompletePage.backHome();
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(header.cartBadge).toBeHidden();
  });

  test('user can complete a quick single-item purchase', async ({
    page,
    inventoryPage,
    header,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    await inventoryPage.addToCart(products.onesie);
    await header.openCart();
    await cartPage.checkout();
    await checkoutStepOnePage.fillInfoAndContinue(defaultCheckoutInfo);
    await checkoutStepTwoPage.finish();

    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.completeText).toContainText(
      'Your order has been dispatched',
    );
  });
});
