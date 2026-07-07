# Swag Labs Playwright Framework

E2E test framework for https://www.saucedemo.com using Playwright Test + TypeScript (strict mode). Covers positive user flows only. There is no application code here — every change is test infrastructure.

## Commands

- `npm test` — run the full suite (chromium)
- `npx playwright test tests/checkout.spec.ts` — run a single spec
- `npm run typecheck` — `tsc --noEmit`; the only static gate (no ESLint/Prettier in this repo)

## Architecture

- `src/pages/` — page objects extending `BasePage`; locators are `readonly` fields assigned in the constructor, using `[data-test="..."]` selectors
- `src/components/AppHeader.ts` — shared header/cart component
- `src/fixtures/test-fixtures.ts` — custom `test` extending Playwright's base with one fixture per page object plus `loggedIn` (signs in as `standard_user`). Specs import `test`/`expect` from here, never from `@playwright/test` directly
- `src/data/` — credentials (`users.ts`) and checkout test data (`checkout-data.ts`)
- `tests/*.spec.ts` — specs, grouped in `test.describe` blocks by feature

## Conventions

- Selectors: prefer `[data-test="..."]` attributes; CSS classes only when no data-test attribute exists
- Every Playwright action and web-first assertion is awaited; async page-object methods return `Promise<void>` or a typed value
- Assertions live in specs, not in page objects
- Test data comes from `src/data/`, not inline literals in specs
- No hard waits (`page.waitForTimeout`); rely on web-first assertions and `waitFor`
- 2-space indent, single quotes, trailing commas — match the surrounding file

## Review criteria

CI (`pr-auto-review.yml`) enforces: typecheck passes, no `.only`/`.skip`, full regression suite green. Code review should additionally check:

1. Missing `await` on Playwright calls or async assertions (silent false positives)
2. Flakiness: hard waits, cross-test state leaks (tests run `fullyParallel`), brittle selectors
3. Tests that cannot fail, or that still pass when the covered behaviour breaks
4. Behaviour changes to `playwright.config.ts`, fixtures, `BasePage`, or shared page objects that affect existing tests
5. Secrets: the public saucedemo demo credentials in `src/data/users.ts` are expected; anything else secret-looking is not

Style/formatting nitpicks are out of scope — strict TypeScript covers the basics.
