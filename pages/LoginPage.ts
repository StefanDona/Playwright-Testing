import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginForm: Locator;
  readonly myAccountPageTitle: Locator;
  readonly loginErrorMessage: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('.btnSubmit');
    this.loginForm = page.locator('.auth-container');
    this.myAccountPageTitle = page.getByTestId('page-title');
    this.loginErrorMessage = page.getByTestId('login-error');
  }

  async navigateToLoginPage() {
    await this.page.goto('/auth/login');
    await expect(this.loginForm, 'Login form not found').toBeVisible();
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
