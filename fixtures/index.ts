import { test as base } from '@playwright/test';
import { createCustomer, type Customer } from '../helpers/api';
import { CatalogPage } from '../pages/CatalogPage';
import { HeaderPage } from '../pages/HeaderPage';
import { LoginPage } from '../pages/LoginPage';
import { PlaceOrderPage } from '../pages/PlaceOrderPage';
import { RegisterPage } from '../pages/RegisterPage';

type Pages = {
  customer: Customer;
  catalogPage: CatalogPage;
  headerPage: HeaderPage;
  loginPage: LoginPage;
  placeOrderPage: PlaceOrderPage;
  registerPage: RegisterPage;
};

export const test = base.extend<Pages>({
  customer: async ({ request }, use) => use(await createCustomer(request)),
  catalogPage: async ({ page }, use) => use(new CatalogPage(page)),
  headerPage: async ({ page }, use) => use(new HeaderPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  placeOrderPage: async ({ page }, use) => use(new PlaceOrderPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
});

export { expect } from '@playwright/test';
