import { test, expect } from '../src/fixtures/test-fixtures';
import { standardUser, validUsers } from '../src/data/users';

test.describe('Authentication - positive flows', () => {
  test('standard user can log in and lands on the Products page', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.load();
    await loginPage.loginAs(standardUser);

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(inventoryPage.inventoryItems.first()).toBeVisible();
  });

  for (const user of validUsers) {
    test(`"${user.username}" can log in successfully`, async ({ page, loginPage }) => {
      test.slow(user.username === 'performance_glitch_user', 'This account responds slowly by design');

      await loginPage.load();
      await loginPage.loginAs(user);

      await expect(page).toHaveURL(/.*inventory\.html/);
    });
  }

  test('logged-in user can log out and returns to the login page', async ({
    page,
    loggedIn,
    header,
    loginPage,
  }) => {
    await header.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.logo).toBeVisible();
  });
});
