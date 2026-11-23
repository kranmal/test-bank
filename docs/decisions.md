# Decisions

| # | Decision | Alternative | Why | REVISITABLE |
|---|----------|-------------|-----|-------------|
| 1 | App type: Web (UI) | API / GraphQL only (first answer) | test-bank is a static SPA with no GraphQL or backend; contradiction resolved by user | no |
| 2 | Tech stack under test: hash-routed single-file SPA, data in localStorage | GraphQL API | Read from kranmal/test-bank README | no |
| 3 | Test volume: under 100 | 100-500 | User answer | yes |
| 4 | Greenfield | Migration | User answer | no |
| 5 | Language: TypeScript | Python | User answer | yes |
| 6 | Team: solo, new to automation | | Fewer layers, more comments | yes |
| 7 | Dev OS: macOS | | User answer | no |
| 8 | CI: GitHub Actions | GitLab CI | User answer | yes |
| 9 | Integrations: none (JUnit XML keeps door open) | Jira, Zephyr | User answer | yes |
| 10 | Compliance: synthetic data only | | User answer | no |
| 11 | Environments: 1 (local) | 3 | User answer; app is static | yes |
| 12 | Parallelism: 2-4 workers | 5-10 / sharding | User changed after volume mismatch (under 100 tests) | yes |
| 13 | Standards: none | BDD | User answer | yes |
| 14 | Delivery target: 1 week, keep all 8 phases as stretch | minimal Phases 1-5 | User chose to keep all phases | yes |
| 15 | Auth: Mix; mocked/seeded session for most tests, one real login test (demo login john/demo, public demo creds from README) | API token | Changed from token approach because target is a UI with localStorage | yes |
| 16 | GitHub repo: kranmal/test-bank | new private repo | User chose existing repo; no clone/push/secrets without explicit yes | yes |
| 17 | Base URL http://localhost:8770; start: `python3 -m http.server 8770` in `app-under-test/` | deployed URL | Step 0c: not reachable at first; user chose a local copy of index.html fetched read-only from kranmal/test-bank; then HTTP 200. Static app: no deployed environment needed, Phase 7 adapts | yes |
| 18 | Stack: @playwright/test 1.65.1, typescript 7.0.2, @types/node 26.6.6 (exact pins); built-in JUnit XML + HTML reporters; JSON data files; no dotenv (Node --env-file); no API layer | Cypress, Allure, faker, dotenv | Phase 2 approved by user. Node runtime v24.16.0. TS 7 compatibility to be verified at install | yes |
| 19 | Pattern: Modular (POM + fixtures); Phase 6 data-driven test adds a hybrid element | Hybrid, keyword-driven/BDD | Solo, under 100 tests; Phase 3 approved by user | yes |
| 20 | Structure approved (config, src/{pages,components,api,utilities}, tests/{smoke,regression}, data, reports, docs); deps installed with exact pins, no versions changed; TS 7.0.2 installed OK | | Phase 4 approved by user; browsers NOT yet downloaded (will ask) | yes |
| 21 | Phase 6: 3 tests written and run (5 passing incl. 3 data cases); chromium downloaded after user yes; failure-artifact check done (png, trace, junit failure, html all present); temp spec deleted | | Note: rtk output filter hides junit/html reporters when piped; use rtk proxy | yes |
| 22 | CI: .github/workflows/tests.yml in kranmal/test-bank: smoke on PR to main; full regression (unsharded) on push to main; app copied from repo-root index.html into app-under-test/ and served by Playwright webServer; no staging, no environments file, no BASE_URL variable | staging branch + 3-way shards (template) | test-bank has only `main` and is a static app; user chose push to main. Vars: TEST_USERNAME (variable), TEST_PASSWORD (secret). Not pushed; pipeline unproven until run on GitHub | yes |
| 23 | Phase 8: docs/owners-guide.md written (checklists, flaky process, cadence, PR checklist) | | Phase 8 plan approved by user | yes |
