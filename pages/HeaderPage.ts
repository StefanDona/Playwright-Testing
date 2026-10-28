import type { Locator, Page } from '@playwright/test';

export class HeaderPage {
  readonly signInButton: Locator;
  readonly createAccountButton: Locator;
  readonly myAccountDropdown: Locator;
  readonly logoutButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.signInButton = page.getByTestId('nav-sign-in');
    this.createAccountButton = page.getByTestId('register-link');
    this.myAccountDropdown = page.locator('.nav-item #menu');
    this.logoutButton = page.locator('.nav-item .dropdown-item', {
      hasText: /^Sign out$/,
    });
    this.cartButton = page.getByTestId('nav-cart');
  }
}
