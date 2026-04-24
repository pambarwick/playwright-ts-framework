# Playwright TypeScript Framework

## What this is
End-to-end test automation framework using Playwright and TypeScript, targeting [Saucedemo](https://www.saucedemo.com) for UI tests and [JSONPlaceholder](https://jsonplaceholder.typicode.com) for API tests.

## Running tests
```bash
npm test                                          # All tests, all browsers
npx playwright test --project=chromium            # Chromium only (fastest)
npx playwright test --project=api                 # API tests only
npx playwright test src/tests/checkout.spec.ts    # Single spec
npm run test:ui                                   # Visual UI mode
npm run type-check                                # TypeScript check
```

## Project structure
```
src/
├── tests/          # Test specs — one file per feature area
├── pages/          # Page Object Models — one class per page
└── fixtures/       # Custom Playwright fixtures (shared page setup)
```

## Conventions
- All page interactions go in page objects, never in test files
- Selectors use `data-test` attributes where available (saucedemo provides these)
- Fixtures handle navigation and page instantiation — tests should not call `page.goto()` directly
- Test credentials live in `.env` (copy from `.env.example`) — saucedemo credentials are public and safe to use as-is

## Adding a new page
1. Create `src/pages/NewPage.ts` extending `BasePage`
2. Add a fixture in `src/fixtures/fixtures.ts`
3. Add the spec file to the relevant `testMatch` array in `playwright.config.ts`

## Adding a new test
- UI test: add to existing spec or create a new `.spec.ts` in `src/tests/`
- API test: add to `src/tests/api.spec.ts`

## CI
GitHub Actions runs chromium + API on every push. Config at `.github/workflows/playwright.yml`.
