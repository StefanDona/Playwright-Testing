import { randomUUID } from 'node:crypto';
import { expect } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

const API_URL = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function createCustomer(request: APIRequestContext): Promise<Customer> {
  const customer = {
    firstName: 'Demo',
    lastName: 'Customer',
    email: `playwright-${randomUUID()}@example.com`,
    password: `Demo!1${randomUUID().slice(0, 12)}`,
  };
  const response = await request.post(`${API_URL}/users/register`, {
    data: {
      first_name: customer.firstName,
      last_name: customer.lastName,
      email: customer.email,
      password: customer.password,
      dob: '1990-01-01',
      phone: '2065550100',
      address: {
        street: 'Demo Street',
        house_number: '1',
        city: 'Seattle',
        state: 'Washington',
        country: 'US',
        postal_code: '98101',
      },
    },
  });
  expect(response.status(), 'Temporary demo customer should be created').toBe(201);
  return customer;
}

export async function getCategoryIdByName(
  request: APIRequestContext,
  categoryName: string
): Promise<string> {
  const response = await request.get(`${API_URL}/categories`);
  expect(response.ok(), 'Categories API request should succeed').toBeTruthy();
  const categories: { id: string; name: string }[] = await response.json();
  const category = categories.find((cat) => cat.name === categoryName);
  if (!category) {
    throw new Error(`Category with name "${categoryName}" not found`);
  }
  return category.id;
}

export async function getProductsByCategoryId(
  request: APIRequestContext,
  categoryId: string
): Promise<Product[]> {
  const response = await request.get(`${API_URL}/products?by_category=${categoryId}`);
  expect(response.ok(), 'Products API request should succeed').toBeTruthy();
  const body: { data: Product[] } = await response.json();
  expect(body.data.length, 'Category should contain at least one product').toBeGreaterThan(0);
  return body.data.map(({ id, name, price }) => ({ id, name, price }));
}
