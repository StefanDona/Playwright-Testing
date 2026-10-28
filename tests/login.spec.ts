import { randomUUID } from 'node:crypto';
import { expect, test } from '../fixtures';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test('Validate login with valid credentials', async ({ loginPage, customer }) => {
    await loginPage.login(customer.email, customer.password);
    await expect(
      loginPage.myAccountPageTitle,
      'Failed to navigate to My Account page after login'
    ).toHaveText('My account');
  });

  test('Validate login with invalid credentials displays error message', async ({ loginPage }) => {
    await loginPage.login(`invalid-${randomUUID()}@example.com`, 'Wrong-password!1');
    await expect(
      loginPage.loginErrorMessage,
      'Failed to display error message for invalid login'
    ).toHaveText('Invalid email or password');
  });

  test('Login and logout successfully', async ({ loginPage, headerPage, customer }) => {
    await loginPage.login(customer.email, customer.password);
    await headerPage.myAccountDropdown.click();
    await headerPage.logoutButton.click();
    await expect(
      headerPage.signInButton,
      'Failed to log out, Sign In button not found'
    ).toBeVisible();
  });
});
