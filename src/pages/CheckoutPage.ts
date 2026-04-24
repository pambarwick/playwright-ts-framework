import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly finishButton: Locator;
  readonly itemTotal: Locator;
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput  = page.locator('[data-test="firstName"]');
    this.lastNameInput   = page.locator('[data-test="lastName"]');
    this.zipCodeInput    = page.locator('[data-test="postalCode"]');
    this.continueButton  = page.locator('[data-test="continue"]');
    this.cancelButton    = page.locator('[data-test="cancel"]');
    this.errorMessage    = page.locator('[data-test="error"]');
    this.finishButton    = page.locator('[data-test="finish"]');
    this.itemTotal       = page.locator('[data-test="subtotal-label"]');
    this.completeHeader  = page.locator('[data-test="complete-header"]');
    this.backHomeButton  = page.locator('[data-test="back-to-products"]');
  }

  async fillInfo(firstName: string, lastName: string, zip: string) {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.zipCodeInput, zip);
    await this.clickElement(this.continueButton);
  }

  async finish() {
    await this.clickElement(this.finishButton);
  }

  async assertOnStep1() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async assertOnStep2() {
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async assertOrderComplete() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async assertErrorMessage(expected: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expected);
  }
}
