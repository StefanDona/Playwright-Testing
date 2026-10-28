import { faker } from '@faker-js/faker';
import type { Locator, Page } from '@playwright/test';

export class PlaceOrderPage {
  readonly addToCartButton: Locator;
  readonly addToCartMessage: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly continueAsGuestButton: Locator;
  readonly continueAsGuestConfirmation: Locator;
  readonly guestEmailInput: Locator;
  readonly guestFirstNameInput: Locator;
  readonly guestLastNameInput: Locator;
  readonly guestContinueButton: Locator;
  readonly proceedToCheckoutButtonStep2: Locator;
  readonly proceedToCheckoutButtonStep3: Locator;
  readonly billingStreet: Locator;
  readonly billingCity: Locator;
  readonly billingState: Locator;
  readonly billingCountry: Locator;
  readonly billingPostalCode: Locator;
  readonly billingHouseNumber: Locator;
  readonly paymentMethodDropdown: Locator;
  readonly bankNameInput: Locator;
  readonly accountNameInput: Locator;
  readonly accountNumberInput: Locator;
  readonly confirmButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(private readonly page: Page) {
    this.addToCartButton = page.locator('#btn-add-to-cart');
    this.addToCartMessage = page.locator('div[role="alert"]');
    this.productQuantity = page.locator('.form-control.quantity');
    this.productPrice = page.getByTestId('product-price');
    this.proceedToCheckoutButton = page.getByTestId('proceed-1');
    this.continueAsGuestButton = page.locator('.login-container .nav-item', {
      hasText: 'Continue as Guest',
    });
    this.continueAsGuestConfirmation = page.locator('p.ng-star-inserted');
    this.guestEmailInput = page.locator('#guest-email');
    this.guestFirstNameInput = page.locator('#guest-first-name');
    this.guestLastNameInput = page.locator('#guest-last-name');
    this.guestContinueButton = page.locator('#guest-tab .btnSubmit');
    this.proceedToCheckoutButtonStep2 = page.locator('button[data-test*="proceed-2"]');
    this.proceedToCheckoutButtonStep3 = page.locator('button[data-test*="proceed-3"]');
    this.billingStreet = page.locator('form #street');
    this.billingCity = page.locator('form #city');
    this.billingState = page.locator('form #state');
    this.billingCountry = page.locator('form #country');
    this.billingPostalCode = page.locator('form #postal_code');
    this.billingHouseNumber = page.getByPlaceholder('e.g. 42');
    this.paymentMethodDropdown = page.locator('#payment-method');
    this.bankNameInput = page.locator('#bank_name');
    this.accountNameInput = page.locator('#account_name');
    this.accountNumberInput = page.locator('#account_number');
    this.confirmButton = page.getByTestId('finish');
    this.confirmationMessage = page.locator('.alert-success');
  }

  async fillBillingAddress() {
    const countries = this.billingCountry.locator('option:not([value=""])');
    const index = faker.number.int({ min: 1, max: await countries.count() });
    await this.billingCountry.selectOption({ index });
    await this.billingPostalCode.fill(faker.location.zipCode());
    await this.billingHouseNumber.fill(faker.string.numeric(2));
    await this.billingStreet.fill(faker.location.streetAddress());
    await this.billingCity.fill(faker.location.city());
    await this.billingState.fill(faker.location.state());
    await this.proceedToCheckoutButtonStep3.click();
  }

  async fillPaymentDetails() {
    await this.paymentMethodDropdown.selectOption({ label: 'Bank Transfer' });
    await this.bankNameInput.fill(`${faker.lorem.word({ length: 8 })} Bank`);
    await this.accountNameInput.fill(faker.person.fullName());
    await this.accountNumberInput.fill(faker.string.numeric(10));
  }

  async fillGuestDetails() {
    await this.guestEmailInput.fill(faker.internet.email());
    await this.guestFirstNameInput.fill(faker.person.firstName());
    await this.guestLastNameInput.fill(faker.person.lastName());
    await this.guestContinueButton.click();
  }
}
