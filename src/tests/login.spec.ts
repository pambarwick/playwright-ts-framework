import { test, expect } from '../fixtures/fixtures';

const USERNAME = process.env.TEST_USERNAME || 'standard_user';
const PASSWORD = process.env.TEST_PASSWORD || 'secret_sauce';

test.describe('Login', () => {
  test('logs in with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory/);
  });

  test('shows error for locked-out user', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', PASSWORD);
    await loginPage.assertErrorMessage('locked out');
  });

  test('shows error for wrong password', async ({ loginPage }) => {
    await loginPage.login(USERNAME, 'wrongpassword');
    await loginPage.assertErrorMessage('do not match');
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
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory/);
  });
});
