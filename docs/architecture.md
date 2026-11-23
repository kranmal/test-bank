# Architecture

Pattern: **Modular** (Page Object Model + Playwright fixtures).

```mermaid
flowchart LR
  subgraph In[Data in]
    C[config/ env + base URL]
    D[data/ JSON files]
    F[factories / fixtures]
  end
  T[tests/ smoke, regression] --> P[src/pages + src/components]
  P --> W[Playwright driver: Chromium]
  W --> A[test-bank app, localhost:8770]
  C --> T
  D --> T
  F --> T
  T --> R
  subgraph Out[Results out]
    R[reports/junit.xml, reports/html, test-results/ screenshots + traces, logs]
  end
```

## Principles
- **Page Object Model:** each page is a class holding its locators and actions; tests never contain raw selectors.
- **Explicit waits:** wait for a visible element or a state, never a fixed sleep.
- **Test independence:** each test starts from its own fresh browser context, so no test depends on another.
- **Separation of concerns:** tests say what, page objects say how, config and data say with what.
