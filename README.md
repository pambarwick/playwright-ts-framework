# Playwright TypeScript Framework

![Playwright Tests](https://github.com/pambarwick/playwright-ts-framework/actions/workflows/playwright.yml/badge.svg)

A clean, maintainable end-to-end test automation framework built with Playwright and TypeScript. Tests run against real applications with no mocked backends.

## Test Suites

| Suite | Target | Coverage |
|-------|--------|----------|
| Login | [Saucedemo](https://www.saucedemo.com) | Valid login, locked-out user, empty fields, error recovery |
| Inventory | [Saucedemo](https://www.saucedemo.com) | Products page, add/remove cart items, sorting, logout |
| Posts API | [JSONPlaceholder](https://jsonplaceholder.typicode.com) | GET list, GET by id, POST, PUT, DELETE, filter by user |

## Structure

```
src/
├── tests/
│   ├── login.spec.ts       # UI authentication tests
│   ├── inventory.spec.ts   # Product browsing & cart tests
│   └── api.spec.ts         # REST API tests
├── pages/
│   ├── BasePage.ts         # Shared page utilities
│   ├── LoginPage.ts        # Login page object
│   ├── InventoryPage.ts    # Products/inventory page object
│   ├── CartPage.ts         # Shopping cart page object
│   └── DashboardPage.ts    # Generic dashboard pattern
└── fixtures/
    └── fixtures.ts         # Custom test fixtures
```

## Getting Started

```bash
npm install
npx playwright install
cp .env.example .env
```

## Running Tests

```bash
npm test                        # All tests, all browsers
npm run test:headed             # With browser visible
npm run test:ui                 # Playwright UI mode
npm run test:api                # API tests only
npm run test:report             # View HTML report
npm run type-check              # TypeScript type checking
```

## Running a Specific Browser or Suite

```bash
npx playwright test --project=chromium
npx playwright test --project=api
npx playwright test src/tests/inventory.spec.ts
```

## Features

- **Page Object Model** — clean separation of test logic and page interactions
- **Custom fixtures** — reusable page setup shared across test files
- **API testing** — request context for validating REST endpoints
- **Multi-browser** — Chromium, Firefox, Safari, Mobile (Pixel 5)
- **CI/CD** — GitHub Actions pipeline with HTML report artifact upload
- **TypeScript** — strict type checking throughout

## Author

[Your Name] · [LinkedIn](#) · [GitHub](#)
