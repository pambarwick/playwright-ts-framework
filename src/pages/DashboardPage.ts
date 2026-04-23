import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly pageHeading: Locator;
  readonly userMenuButton: Locator;
  readonly logoutButton: Locator;
  readonly welcomeMessage: Locator;
  readonly notificationsButton: Locator;
  readonly searchInput: Locator;
  readonly sidebarNav: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading         = page.getByRole('heading', { level: 1 });
    this.userMenuButton      = page.getByRole('button', { name: /account|profile|user/i });
    this.logoutButton        = page.getByRole('menuitem', { name: /log out|sign out/i });
    this.welcomeMessage      = page.getByTestId('welcome-message');
    this.notificationsButton = page.getByRole('button', { name: /notifications/i });
    this.searchInput         = page.getByRole('searchbox');
    this.sidebarNav          = page.getByRole('navigation', { name: /sidebar|main/i });
  }

  async assertLoaded() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.pageHeading).toBeVisible();
  }

  async logout() {
    await this.clickElement(this.userMenuButton);
    await this.clickElement(this.logoutButton);
    await this.page.waitForURL(/login|signin/i);
  }

  async search(query: string) {
    await this.fillInput(this.searchInput, query);
    await this.searchInput.press('Enter');
  }

  async navigateTo(section: string) {
    await this.clickElement(
      this.sidebarNav.getByRole('link', { name: new RegExp(section, 'i') })
    );
  }

  async getWelcomeText(): Promise<string> {
    return this.welcomeMessage.innerText();
  }

  async dismissNotificationsIfPresent() {
    const badge = this.notificationsButton.locator('.badge');
    const hasBadge = await badge.isVisible().catch(() => false);
    if (hasBadge) {
      await this.clickElement(this.notificationsButton);
    }
  }
}
