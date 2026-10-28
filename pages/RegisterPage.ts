import { faker } from '@faker-js/faker';
import type { Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dateOfBirth: Locator;
  readonly street: Locator;
  readonly postalCode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly countryDropdown: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly registerButton: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.dateOfBirth = page.locator('#dob');
    this.street = page.locator('#street');
    this.postalCode = page.locator('#postal_code');
    this.city = page.locator('#city');
    this.state = page.locator('#state');
    this.countryDropdown = page.locator('#country');
    this.phone = page.locator('#phone');
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.registerButton = page.locator('.btnSubmit');
  }

  async selectRandomCountry() {
    const options = this.countryDropdown.locator('option:not([value=""])');
    const count = await options.count();
    const index = faker.number.int({ min: 0, max: count - 1 });
    await this.countryDropdown.selectOption({ index: index + 1 });
  }

  async fillRegisterForm() {
    const birthday = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

    await this.firstName.fill(faker.person.firstName());
    await this.lastName.fill(faker.person.lastName());
    await this.dateOfBirth.fill(birthday.toISOString().split('T')[0]);
    await this.street.fill(faker.location.streetAddress());
    await this.postalCode.fill(faker.location.zipCode());
    await this.city.fill(faker.location.city());
    await this.state.fill(faker.location.state());
    await this.selectRandomCountry();
    await this.phone.fill(faker.string.numeric(10));
    await this.email.fill(faker.internet.email());
    await this.password.fill(`Aa1!${faker.string.alphanumeric(10)}`);
    await this.registerButton.click();
  }
}
