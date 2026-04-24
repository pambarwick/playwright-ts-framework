import { test, expect } from '../fixtures/fixtures';

const USERNAME = process.env.TEST_USERNAME || 'standard_user';
const PASSWORD = process.env.TEST_PASSWORD || 'secret_sauce';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory/);
  });

  test('completes a full purchase end-to-end', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.clickElement(inventoryPage.cartLink);
    await cartPage.assertItemInCart('Sauce Labs Backpack');
    await cartPage.proceedToCheckout();
    await checkoutPage.assertOnStep1();
    await checkoutPage.fillInfo('Jane', 'Doe', '12345');
    await checkoutPage.assertOnStep2();
    await checkoutPage.finish();
    await checkoutPage.assertOrderComplete();
  });

  test('shows order confirmation after buying multiple items', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.clickElement(inventoryPage.cartLink);
    await cartPage.assertLoaded();
    await cartPage.assertItemInCart('Sauce Labs Backpack');
    await cartPage.assertItemInCart('Sauce Labs Bike Light');
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo('Jane', 'Doe', '12345');
    await checkoutPage.finish();
    await checkoutPage.assertOrderComplete();
  });

  test('shows error when first name is missing', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.clickElement(inventoryPage.cartLink);
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo('', 'Doe', '12345');
    await checkoutPage.assertErrorMessage('First Name is required');
  });

  test('shows error when last name is missing', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.clickElement(inventoryPage.cartLink);
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo('Jane', '', '12345');
    await checkoutPage.assertErrorMessage('Last Name is required');
  });

  test('shows error when zip code is missing', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.clickElement(inventoryPage.cartLink);
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo('Jane', 'Doe', '');
    await checkoutPage.assertErrorMessage('Postal Code is required');
  });

  test('can cancel checkout and return to cart', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.clickElement(inventoryPage.cartLink);
    await cartPage.proceedToCheckout();
    await checkoutPage.assertOnStep1();
    await checkoutPage.clickElement(checkoutPage.cancelButton);
    await expect(page).toHaveURL(/cart/);
  });
});
