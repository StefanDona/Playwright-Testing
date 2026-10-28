import { getCategoryIdByName, getProductsByCategoryId } from '../helpers/api';
import { expect, test } from '../fixtures';

test.describe('Place Order Tests', () => {
  test('Place an order as a registered user', async ({
    page,
    request,
    customer,
    loginPage,
    headerPage,
    placeOrderPage,
  }) => {
    const categoryId = await getCategoryIdByName(request, 'Pliers');
    const [product] = await getProductsByCategoryId(request, categoryId);

    await loginPage.navigateToLoginPage();
    await loginPage.login(customer.email, customer.password);
    await expect(loginPage.myAccountPageTitle).toBeVisible();
    await page.goto(`/product/${product.id}`);
    await placeOrderPage.addToCartButton.click();
    await expect(placeOrderPage.addToCartMessage).toHaveText('Product added to shopping cart.');
    await headerPage.cartButton.click();
    await expect(placeOrderPage.productQuantity).toHaveValue('1');
    await expect(placeOrderPage.productPrice).toHaveText(`$${product.price}`);
    await placeOrderPage.proceedToCheckoutButton.click();
    await expect(placeOrderPage.continueAsGuestConfirmation).toHaveText(
      `Hello ${customer.firstName} ${customer.lastName}, you are already logged in. You can proceed to checkout.`
    );
    await placeOrderPage.proceedToCheckoutButtonStep2.click();
    await placeOrderPage.fillBillingAddress();
    await placeOrderPage.fillPaymentDetails();
    await placeOrderPage.confirmButton.click();
    await expect(placeOrderPage.confirmationMessage).toHaveText('Payment was successful');
  });

  test('Place an order as a guest user', async ({ page, request, headerPage, placeOrderPage }) => {
    const categoryId = await getCategoryIdByName(request, 'Pliers');
    const [product] = await getProductsByCategoryId(request, categoryId);

    await page.goto(`/product/${product.id}`);
    await placeOrderPage.addToCartButton.click();
    await expect(placeOrderPage.addToCartMessage).toHaveText('Product added to shopping cart.');
    await headerPage.cartButton.click();
    await expect(placeOrderPage.productQuantity).toHaveValue('1');
    await expect(placeOrderPage.productPrice).toHaveText(`$${product.price}`);
    await placeOrderPage.proceedToCheckoutButton.click();
    await placeOrderPage.continueAsGuestButton.click();
    await placeOrderPage.fillGuestDetails();
    await placeOrderPage.proceedToCheckoutButtonStep2.click();
    await placeOrderPage.fillBillingAddress();
    await placeOrderPage.fillPaymentDetails();
    await placeOrderPage.confirmButton.click();
    await expect(placeOrderPage.confirmationMessage).toHaveText('Payment was successful');
  });
});
