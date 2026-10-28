import { expect, type Locator, type Page } from '@playwright/test';

export class CatalogPage {
  readonly searchBox: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  readonly cardTitle: Locator;
  readonly noResultsMessage: Locator;
  readonly searchResultTitle: Locator;
  readonly searchTerm: Locator;

  constructor(private readonly page: Page) {
    this.searchBox = page.locator('#search-query');
    this.submitButton = page.getByTestId('search-submit');
    this.resetButton = page.getByTestId('search-reset');
    this.cardTitle = page.locator('.card-title');
    this.noResultsMessage = page.getByTestId('no-results');
    this.searchResultTitle = page.getByTestId('search-caption');
    this.searchTerm = page.getByTestId('search-term');
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(term: string) {
    await this.searchBox.fill(term);
    await this.submitButton.click();
  }

  async selectCategoryCheckbox(categoryName: string) {
    await this.page.locator('label', { hasText: new RegExp(categoryName, 'i') }).click();
  }

  async validateFullSearchTitle(searchTerm: string) {
    await expect(this.searchResultTitle).toHaveText(`Searched for: ${searchTerm}`, {
      ignoreCase: true,
    });
  }

  async validateAllResultsContain(expectedText: string) {
    await expect
      .poll(async () => {
        const titles = await this.cardTitle.allInnerTexts();
        return (
          titles.length > 0 &&
          titles.every((title) => title.toLowerCase().includes(expectedText.toLowerCase()))
        );
      }, `All results should contain "${expectedText}"`)
      .toBe(true);
  }
}
