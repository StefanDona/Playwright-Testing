import { expect, test } from '../fixtures';

test.describe('User Registration Tests', () => {
  test('Create a new user account with valid data', async ({
    page,
    headerPage,
    loginPage,
    registerPage,
  }) => {
    await page.goto('/');
    await headerPage.signInButton.click();
    await headerPage.createAccountButton.click();
    await registerPage.fillRegisterForm();
    await expect(loginPage.loginForm, 'Login form not found').toBeVisible();
  });
});
