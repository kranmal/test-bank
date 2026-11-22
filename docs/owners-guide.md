# Framework Owner's Guide

Project: Playwright + TypeScript tests for the test-bank demo app. Pattern: Modular (page objects + fixtures).

## Checklist: add a test
1. Pick the folder: `tests/smoke/` (one happy path, runs on every PR) or `tests/regression/` (everything else).
2. Name it as a sentence: `a customer can ...`.
3. Import `test` and `expect` from `src/fixtures`, not from `@playwright/test`.
4. Use `loggedInPage` when login is not what you are testing; use `LoginPage` only for real log-on tests.
5. No raw selectors, hardcoded values or fixed sleeps in the test. Put values in `data/` or config.
6. One assertion (three at most, closely related).
7. Run `npm run typecheck && npm test`, and check it passes alone and with the whole suite.

## Checklist: add a page object
1. Create `src/pages/<Name>Page.ts` extending `BasePage`.
2. Inspect the real page first; prefer role, label or text locators, then `name`/`id`, never long CSS or XPath.
3. Expose locators for assertions (`readonly`) and methods for actions.
4. Keep logic out of page objects: they describe the page, tests decide what to check.

## Checklist: add an environment
1. Set `BASE_URL` (and credential variables) in `.env` locally, or as repo variables/secrets in CI.
2. If the app is no longer served locally, update or remove `webServer` in `playwright.config.ts`.
3. Never point destructive tests at production. Record the change in `docs/decisions.md`.

## Flaky-test process
1. **Diagnose:** re-run it 10 times (`npx playwright test <file> --repeat-each=10`); open the trace in `reports/html`.
2. **Fix:** replace any timing guess with an explicit wait for an element or state; make the test independent of others.
3. **Quarantine** only if the fix is not quick: mark `test.fixme(...)` with a comment and a date, so it is visible, not deleted.
4. **Document:** note cause and fix in `docs/decisions.md`. Review quarantined tests weekly; do not let them age.

## When the app changes
1. Run the suite; failures point to the page object whose locator broke.
2. Fix the locator in the page object once, not in each test.
3. If the behaviour changed on purpose, update the test's expectation and data files.

## Review cadence
- Every PR: smoke runs automatically.
- Weekly: look at flaky/quarantined tests and CI run times.
- Monthly: update dependencies (`npm outdated`), re-run everything, then record new pinned versions in `docs/decisions.md`.
- Quarterly: re-read `docs/decisions.md` and revisit every REVISITABLE choice.

## PR checklist for framework changes
- [ ] `npm run typecheck` and `npm test` pass locally
- [ ] No secrets, real data or `.env` in the diff
- [ ] Tests import from `src/fixtures`; no raw selectors in tests
- [ ] New locators live in a page object
- [ ] No fixed sleeps; waits are explicit
- [ ] Dependency changes are pinned and noted in `docs/decisions.md`
- [ ] Docs updated if commands, structure or decisions changed
