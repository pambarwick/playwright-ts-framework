import { test, expect } from '../fixtures/fixtures';

const USERNAME = process.env.TEST_USERNAME || 'standard_user';
const PASSWORD = process.env.TEST_PASSWORD || 'secret_sauce';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory/);
  });

  test('displays 6 products', async ({ inventoryPage }) => {
    await inventoryPage.assertLoaded();
  });

  test('adds item to cart and updates badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('adds multiple items and shows correct count', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('removes item from cart', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.removeFromCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('sorts products A to Z by default', async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames().allTextContents();
    expect(names).toEqual([...names].sort());
  });

  test('sorts products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices().allTextContents();
    const values = prices.map((p) => parseFloat(p.replace('$', '')));
    expect(values).toEqual([...values].sort((a, b) => a - b));
  });

  test('cart page shows added items', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.clickElement(inventoryPage.cartLink);
    await cartPage.assertLoaded();
    await cartPage.assertItemInCart('Sauce Labs Backpack');
  });

  test('logs out and returns to login page', async ({ inventoryPage, page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
