# Swag Labs Playwright Automation Framework

End-to-end automation framework built with [Playwright](https://playwright.dev/) + TypeScript that covers all **positive user flows** of the [Swag Labs](https://www.saucedemo.com/) demo store, with CI/CD on GitHub Actions and a fully automated PR review & merge system.

## Test coverage (25 tests)

| Area | Flows covered |
|---|---|
| **Authentication** | Login as `standard_user`; login success for every valid account (`standard_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`); logout |
| **Inventory** | All 6 products render with name/price/button; sorting by name (Aâ†’Z, Zâ†’A) and price (lowâ†’high, highâ†’low) |
| **Product details** | Details match the listing; add to cart from details page; back to products |
| **Cart** | Add products (badge + Remove button); cart lists items; remove item; continue shopping keeps cart |
| **Checkout** | Full E2E purchase of two products with subtotal/tax/total validation and order confirmation; quick single-item purchase |
| **Navigation** | Burger menu options; "All Items" navigation; reset app state; footer social links |

## Framework design

```
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ pages/          # Page Object Model (Login, Inventory, ProductDetails, Cart, Checkout x3)
â”‚   â”œâ”€â”€ components/     # Shared components (AppHeader: burger menu, cart badge)
â”‚   â”œâ”€â”€ fixtures/       # Custom Playwright fixtures injecting page objects + loggedIn fixture
â”‚   â””â”€â”€ data/           # Test data (users, checkout info, product names)
â”œâ”€â”€ tests/              # Specs grouped by feature
â”œâ”€â”€ playwright.config.ts
â””â”€â”€ .github/workflows/  # CI/CD pipelines
```

- **Page Object Model** â€” every page/component wraps its locators (all `data-test` based) and actions.
- **Custom fixtures** â€” tests receive ready-made page objects; the `loggedIn` fixture handles authentication.
- **Data-driven** â€” credentials and checkout data live in `src/data/`, not in specs.
- **CI hardening** â€” retries + trace/screenshot/video on failure, `forbidOnly` in CI.

## Running locally

```bash
npm ci
npx playwright install chromium
npm test               # run the suite
npm run report         # open the Playwright HTML report
npm run test:headed    # watch the browser
npm run typecheck      # TypeScript check
```

The HTML report is written to `playwright-report/` after every run.

## CI/CD integration pipelines

### 1. `playwright-tests.yml` â€” regression on main
Triggers on every **push to `main`** (and manually via *workflow_dispatch*). Runs the full suite and uploads the **Playwright HTML report** as a build artifact (`playwright-report`, kept 30 days). Download it from the workflow run page and open `index.html`.

### 2. `pr-auto-review.yml` â€” automated PR review & merge
Triggers on every **pull request to `main`** and enforces these merge criteria:

| # | Criterion |
|---|---|
| 1 | TypeScript compiles cleanly (`tsc --noEmit`) |
| 2 | No focused (`.only`) or skipped (`.skip`) tests committed |
| 3 | Full Playwright regression suite passes |

- âœ… **All criteria pass** â†’ the workflow approves the PR with a review summary and **squash-merges it into `main`** automatically (branch is deleted).
- âŒ **Any criterion fails** â†’ the PR is **not merged**; the workflow comments on the PR with a link to the failed run + report, and **sends an email notification** to the maintainer.

The Playwright HTML report is uploaded as an artifact for every PR run as well (`playwright-report-pr-<number>`).

### Email notification setup (one-time)

The failure email is sent through Gmail SMTP. Add two repository secrets under **Settings â†’ Secrets and variables â†’ Actions**:

| Secret | Value |
|---|---|
| `MAIL_USERNAME` | Your Gmail address |
| `MAIL_PASSWORD` | A Gmail **App Password** (Google Account â†’ Security â†’ 2-Step Verification â†’ App passwords) |

Until the secrets are configured the email step is skipped gracefully â€” the PR comment is always posted.

> **Note:** Auto-merge applies to branches in this repository (not forks), which is the standard security model for GitHub Actions tokens.

---
_Auto-merge system verified via demo PR. Post-merge regression dispatch verified._
