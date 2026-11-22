# Requirements: test-bank test automation framework

**Target:** test-bank, a fictional demo bank (single-file, hash-routed SPA, data in localStorage). Repo `kranmal/test-bank`. Served locally at http://localhost:8770.

**Scope:** Web UI tests, TypeScript, solo developer new to automation, macOS, greenfield, under 100 tests, one local environment, 2-4 workers, GitHub Actions, JUnit XML + HTML reports, synthetic data only, secrets via env vars only. Target: all 8 phases within 1 week (stretch).

**Auth:** one real login test (public demo credentials from the app README, supplied via env vars); every other test starts from a seeded session.

## Non-Goals
- Performance testing, visual regression
- Mobile and desktop apps
- GraphQL/API testing (the app has no backend)
- Multi-environment runs (one local environment)
- Third-party integrations (Jira, Zephyr, Allure)

## REVISITABLE defaults / choices
Test volume (under 100), language, team abstraction level, CI platform, integrations (none), environments (1), workers (2-4), standards (none), delivery target (1 week stretch), auth mix, GitHub repo, base URL and start command.

## Please confirm or correct
Anything above that is wrong or missing.
