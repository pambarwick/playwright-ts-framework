import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      testMatch: ['**/login.spec.ts', '**/inventory.spec.ts'],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: ['**/login.spec.ts', '**/inventory.spec.ts'],
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: ['**/login.spec.ts', '**/inventory.spec.ts'],
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      testMatch: ['**/login.spec.ts', '**/inventory.spec.ts'],
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'api',
      testMatch: '**/api.spec.ts',
    },
  ],
});
