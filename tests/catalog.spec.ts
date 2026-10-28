import { expect, test } from '../fixtures';

test.describe('Catalog Tests', () => {
  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.goto();
  });

  test('Validate that searching for a product returns the product', async ({ catalogPage }) => {
    await catalogPage.search('Bolt Cutters');
    await expect(catalogPage.cardTitle).toHaveText(['Bolt Cutters']);
  });

  test('Validate that searching for a non-existent product shows no results', async ({
    catalogPage,
  }) => {
    await catalogPage.search('NonExistentProduct123');
    await expect(catalogPage.noResultsMessage).toHaveText('There are no products found.');
  });

  test('Validate that Reset button clears search input and results', async ({ catalogPage }) => {
    await catalogPage.search('Hammer');
    await catalogPage.validateFullSearchTitle('Hammer');
    await catalogPage.resetButton.click();
    await expect(catalogPage.searchBox, 'Search input should be cleared').toHaveValue('');
    await expect(
      catalogPage.searchResultTitle,
      'Search results title should be cleared'
    ).toHaveCount(0);
  });

  test('Validate that Single Category Filter works', async ({ catalogPage }) => {
    await catalogPage.selectCategoryCheckbox('Hammer');
    await catalogPage.validateAllResultsContain('Hammer');
  });
});
