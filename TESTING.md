# test-bank end-to-end tests

Playwright + TypeScript tests for the [test-bank](https://github.com/kranmal/test-bank) demo bank app (a static, single-file web app). Modular pattern: page objects + fixtures. Reports: JUnit XML and HTML. CI: GitHub Actions.

## Quick start (under 5 minutes)

Requires Node 24 (see `.nvmrc`) and Python 3 (serves the app).

```bash
npm ci
cp .env.example .env            # then fill TEST_USERNAME / TEST_PASSWORD (public demo login is in the app's README)
mkdir -p app-under-test && cp index.html app-under-test/   # in the test-bank repo the app is index.html at the root
npx playwright install chromium   # one-off download, about 150-200 MB
npm test
```

`npm test` starts the app itself on http://localhost:8770 (Playwright `webServer`, or reuses one already running), runs all tests, and writes `reports/junit.xml` and `reports/html/`. Open the HTML report with `npm run report`. If the app lives elsewhere, set `BASE_URL`.

Other commands: `npm run test:smoke`, `npm run typecheck`.

## Architecture at a glance

```
tests/            smoke/ (one happy path, runs on every PR), regression/ (data-driven, negative)
src/pages/        page objects: BasePage, LoginPage, OverviewPage
src/fixtures.ts   test fixtures: loggedInPage (seeded session), log (structured logger)
src/utilities/    dataLoader, factories, logger
config/env.ts     env vars, timeouts (credentials only from environment variables)
data/             synthetic JSON test data
reports/          junit.xml, html/, test.log   (git-ignored)
.github/workflows/tests.yml   smoke on PR to main, full suite on push to main
docs/             decisions.md, requirements.md, architecture.md, owners-guide.md
```

Tests call page objects, page objects call Playwright. Config and data go in; JUnit, HTML, screenshots, traces and logs come out. Most tests use the `loggedInPage` fixture, which seeds the app's session in `localStorage`; one test does the real log-on.

## Add your first test

1. Create `tests/regression/<what-it-checks>.spec.ts`.
2. Import `test` and `expect` from `../../src/fixtures`.
3. Use `loggedInPage` with `OverviewPage` (or `LoginPage` for log-on tests). New locators belong in a page object, never in the test.
4. Name it as a sentence, one assertion, values from `data/` or config.
5. Run `npm run typecheck && npm test`.

Failures leave a screenshot and trace in `test-results/`. See `docs/owners-guide.md` for checklists, the flaky-test process and the PR checklist.

## CI

The workflow needs repo variable `TEST_USERNAME` and repo secret `TEST_PASSWORD`. The pipeline has not been run on GitHub yet; the first push proves it. Decisions and their alternatives are in `docs/decisions.md`.
