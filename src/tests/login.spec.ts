import { test, expect } from '../fixtures/fixtures';

const USERNAME = process.env.TEST_USERNAME || 'standard_user';
const PASSWORD = process.env.TEST_PASSWORD || 'secret_sauce';

test.describe('Login', () => {
  test('logs in with valid credentials', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory/);
    await expect(page).toHaveTitle('Swag Labs');
    await inventoryPage.assertLoaded();
  });

  test('shows error for locked-out user', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', PASSWORD);
    await loginPage.assertErrorMessage('Sorry, this user has been locked out');
  });

  test('shows error for wrong password', async ({ loginPage }) => {
    await loginPage.login(USERNAME, 'wrongpassword');
    await loginPage.assertErrorMessage('Username and password do not match any user in this service');
  });

  test('shows error when username is empty', async ({ loginPage }) => {
    await loginPage.login('', PASSWORD);
    await loginPage.assertErrorMessage('Username is required');
  });

  test('shows error when password is empty', async ({ loginPage }) => {
    await loginPage.login(USERNAME, '');
    await loginPage.assertErrorMessage('Password is required');
  });

  test('recovers from failed login and succeeds', async ({ loginPage, page }) => {
    await loginPage.login(USERNAME, 'wrongpassword');
    await loginPage.assertErrorMessage('Username and password do not match any user in this service');
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory/);
  });

  test('problem_user has broken product images [known bug]', async ({ loginPage, page }) => {
    // test.fail() documents a known saucedemo bug — problem_user logs in successfully
    // but product images point to incorrect paths and fail to load
    test.fail();
    await loginPage.login('problem_user', PASSWORD);
    await expect(page).toHaveURL(/inventory/);
    const firstImageSrc = await page
      .locator('[data-test="inventory-item"] img')
      .first()
      .getAttribute('src');
    expect(firstImageSrc).toContain('sauce-backpack');
  });
});
