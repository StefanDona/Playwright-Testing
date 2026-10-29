# Playwright E2E Testing Demo

[![Playwright Tests](https://github.com/StefanDona/Playwright-Testing/actions/workflows/playwright.yml/badge.svg)](https://github.com/StefanDona/Playwright-Testing/actions/workflows/playwright.yml)

A runnable QA automation demo for [Practice Software Testing](https://practicesoftwaretesting.com), built with Playwright, TypeScript, and the Page Object Model.

## Quick Start

Prerequisites: Node.js 22.13+ (Node.js 22 LTS recommended), npm, and internet access.

```bash
git clone https://github.com/StefanDona/Playwright-Testing.git
cd Playwright-Testing
npm ci
npx playwright install chromium
npm test
```

No account setup, `.env` file, or GitHub secrets are required. Tests run headlessly in Chromium. On Linux, use `npx playwright install --with-deps chromium` if browser system dependencies are missing.

## Scenarios

| Area | Scenario | Specification |
| --- | --- | --- |
| Catalog | Search for an existing product | [catalog.spec.ts](tests/catalog.spec.ts) |
| Catalog | Search for a non-existent product | [catalog.spec.ts](tests/catalog.spec.ts) |
| Catalog | Reset the search input and search caption | [catalog.spec.ts](tests/catalog.spec.ts) |
| Catalog | Filter products by a single category | [catalog.spec.ts](tests/catalog.spec.ts) |
| Authentication | Log in with valid credentials | [login.spec.ts](tests/login.spec.ts) |
| Authentication | Reject invalid credentials | [login.spec.ts](tests/login.spec.ts) |
| Authentication | Log in and log out | [login.spec.ts](tests/login.spec.ts) |
| Checkout | Place an order as a registered customer | [placeOrder.spec.ts](tests/placeOrder.spec.ts) |
| Checkout | Place an order as a guest | [placeOrder.spec.ts](tests/placeOrder.spec.ts) |
| Registration | Create an account with valid data | [register.spec.ts](tests/register.spec.ts) |

Checkout scenarios verify the add-to-cart notification, quantity, API-derived price, and successful bank-transfer payment. Registration verifies the return to the login form; it does not cover invalid fields, duplicate emails, or subsequent login.

## Design

- **Page Objects** encapsulate locators and user interactions.
- **Typed fixtures** provide a fresh browser context and page objects for each test.
- **Independent test data:** authentication tests and registered checkout create their own customer through the API. Registration itself remains a UI test. Faker supplies synthetic registration, guest, billing, and payment data.
- **API-assisted setup:** checkout selects the first product returned for the Pliers category instead of hard-coding a product ID or price.
- **Web-first assertions:** Playwright retries checks; category validation polls until all displayed titles match. No fixed sleeps are used.
- **Failure evidence:** HTML and JUnit reports, screenshots and video on failure, and a trace on the first retry.

## Migration Notes

All 10 TestCafe scenarios are represented, but this is not a line-by-line translation. The demo uses Playwright fixtures and Faker instead of TestCafe singletons and Chance. The authenticated checkout still checks the full greeting, using the generated customer's name instead of a fixed account. Reset also checks that the search input is empty, while registration and logout require visible final elements rather than DOM presence alone.

The original TestCafe project remains separate for comparison. Additional selectors in its Page Objects are not treated as extra scenarios unless an actual test uses them.

## Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run all 10 scenarios in Chromium, headless |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:ui` | Open Playwright's interactive test runner |
| `npx playwright test tests/login.spec.ts` | Run authentication scenarios only |
| `npx playwright test --debug` | Debug tests with Playwright Inspector |
| `npm run test:report` | Open the latest local HTML report |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run oxfmt:check` | Check formatting |
| `npm run oxfmt:fix` | Format project files |

## Configuration

Defaults target the public training application. To use a compatible test deployment, optionally copy [.env.example](.env.example) to `.env` and set `BASE_URL` and `API_URL` to the matching frontend and backend. On Windows PowerShell, use `Copy-Item .env.example .env`.

No real credentials or payment details are needed. `.env` variants, browser authentication state, dependencies, and generated reports are excluded from Git. Do not point this suite at a production service.

Tests create synthetic accounts and demo orders on an external sandbox. They do not delete that data afterwards; the sandbox controls its own resets. Availability, rate limits, application changes, and resets can affect runs. A passing run demonstrates the covered flows, not complete application coverage.

## GitHub Actions

The [workflow](.github/workflows/playwright.yml) runs on pushes and pull requests to `main`, and can also be started manually from the Actions tab. It installs dependencies and Chromium, checks TypeScript and formatting, and executes all scenarios. CI uses one worker and up to two retries to limit load on the shared sandbox.

Download the `playwright-reports` artifact from a workflow run for HTML/JUnit reports and available failure evidence. Artifacts are retained for 7 days. Generated demo credentials may appear in traces or screenshots; no personal credentials should be used.

## Structure

```text
.github/workflows/  GitHub Actions pipeline
tests/              The 10 migrated E2E scenarios
pages/              Page Object classes
fixtures/           Typed page-object and customer fixtures
helpers/            API setup and product discovery
reports/            Generated HTML and JUnit reports (ignored)
test-results/       Generated failure evidence (ignored)
```
