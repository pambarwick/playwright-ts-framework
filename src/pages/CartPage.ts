import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems              = page.locator('[data-test="cart-item"]');
    this.checkoutButton         = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/cart/);
  }

  async assertItemInCart(productName: string) {
    await expect(
      this.page.locator('[data-test="inventory-item-name"]', { hasText: productName })
    ).toBeVisible();
  }

  async assertItemNotInCart(productName: string) {
    await expect(
      this.page.locator('[data-test="inventory-item-name"]', { hasText: productName })
    ).not.toBeVisible();
  }

  async assertCartCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeItem(productSlug: string) {
    await this.clickElement(
      this.page.locator(`[data-test="remove-${productSlug}"]`)
    );
  }

  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
    await this.page.waitForURL(/checkout/);
  }
}
