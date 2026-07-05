import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Inventory - positive flows', () => {
  test.beforeEach(async ({ loggedIn }) => {
    // loggedIn fixture signs in as standard_user
  });

  test('all six products are displayed with name, price and Add to cart button', async ({
    inventoryPage,
  }) => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);

    const names = await inventoryPage.getItemNames();
    const prices = await inventoryPage.getItemPrices();

    expect(names.every((name) => name.trim().length > 0)).toBe(true);
    expect(prices.every((price) => price > 0)).toBe(true);
    await expect(
      inventoryPage.inventoryItems.first().getByRole('button', { name: 'Add to cart' }),
    ).toBeVisible();
  });

  test('products can be sorted by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');

    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('products can be sorted by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');

    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('products can be sorted by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('products can be sorted by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');

    const prices = await inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});
