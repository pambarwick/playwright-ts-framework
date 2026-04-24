import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle        = page.locator('[data-test="title"]');
    this.inventoryItems   = page.locator('[data-test="inventory-item"]');
    this.sortDropdown     = page.locator('[data-test="product-sort-container"]');
    this.cartLink         = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge        = page.locator('[data-test="shopping-cart-badge"]');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink       = page.locator('[data-test="logout-sidebar-link"]');
  }

  async assertLoaded() {
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryItems).toHaveCount(6);
  }

  async addToCart(productSlug: string) {
    await this.clickElement(
      this.page.locator(`[data-test="add-to-cart-${productSlug}"]`)
    );
  }

  async removeFromCart(productSlug: string) {
    await this.clickElement(
      this.page.locator(`[data-test="remove-${productSlug}"]`)
    );
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  getProductNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  getProductPrices(): Locator {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  async goToCart() {
    await this.clickElement(this.cartLink);
  }

  async clickProduct(productName: string) {
    await this.clickElement(
      this.page.locator('[data-test="inventory-item-name"]', { hasText: productName })
    );
  }

  async logout() {
    await this.clickElement(this.burgerMenuButton);
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.clickElement(this.logoutLink);
  }
}
