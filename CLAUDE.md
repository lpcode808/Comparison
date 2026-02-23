# Comparison Tool — Claude Context

## Project Overview

Interactive comparison table for AI tools in the agentic era. Built on Ethan Mollick's Feb 2026 framework: **Models → Apps → Harnesses**. Vanilla JS, no build step, GitHub Pages deployable.

## Current Architecture (v3, 2026-02-22)

### Core Files
- `index.html` — v3 landing page (was `v3.html`); all CSS embedded
- `app-v3.js` — data model + rendering logic
- `v1/index.html` + `v1/app.js` — archived 2025 version (PII-cleaned), links back to v3
- `tests/v3.spec.js` — 67 Playwright E2E tests
- `playwright.config.js` — runs Python HTTP server on port 8002
- `package.json` / `pnpm-lock.yaml` — `pnpm test` to run suite

### Data Model (`app-v3.js`)

```javascript
const modelData = [
  {
    service: "ChatGPT",
    company: "OpenAI",
    category: "Chatbot",           // Chatbot | Coding Agent | Work Agent | Research Tool
    underlyingModel: "GPT-5.2 Thinking",
    cost: "$20/mo",
    technicalLevel: "Beginner",    // Beginner | Intermediate | Advanced
    autonomy: "Semi-autonomous",   // Chat only | Semi-autonomous | Fully autonomous
    harnessStrength: 3,            // 1–4 filled dots
    webAccess: true,
    // ... boolean/string capabilities
    superpower: "..."
  }
]
```

### Color System

Three separate color objects in `app-v3.js`:

| Object | Used for | Contrast required |
|---|---|---|
| `companyColors` | Decorative dots only | None (decorative) |
| `categoryColors` | Category pills, inline badges, fallback | 4.5:1 on tinted bg |
| `serviceColors` | Service toggle buttons | 4.5:1 on white |

**Toggle button rule**: brand hue, darkened so white text passes WCAG 4.5:1. App/chatbot = lighter shade; harness/agent = darker shade of same company hue.

### Key Features
- Framework banner: Models → Apps → **Harnesses** (highlighted)
- Category filter pills: All / Chatbots / Coding Agents / Work Agents / Research Tools
- Harness strength: ●●●● filled dots (1–4)
- Autonomy badge: Chat only / Semi-autonomous / Fully autonomous (color-coded)
- Boolean sort: click attribute row label to reorder columns
- Fuzzy search: Fuse.js across service/company/superpower/model
- Service + attribute toggle panels with show/hide all
- Collapsible instruction sections

## Testing

```bash
pnpm test           # run all 49 tests (Chromium, headless)
pnpm test:headed    # see the browser
pnpm test:report    # view last report
```

Tests cover: smoke, data integrity, category filtering, search, service/attribute toggles, boolean sort, collapsible panels, data quality (badges/dots), accessibility (axe-core WCAG AA), mobile (iPhone SE 375px).

**Accessibility status**: 0 CRITICAL, 0 SERIOUS, 0 MODERATE violations.

## Deployment

GitHub Pages from root. The old repo was deleted and recreated (PII was in history). Push only:
```
index.html, app-v3.js, v1/, tests/, playwright.config.js, package.json, pnpm-lock.yaml, .gitignore
```

Do NOT commit: `node_modules/`, `playwright-report/`, `test-results/`, `.DS_Store`

## Development Notes

- **No build step** — edit files, test, push
- **Fuse.js** loaded from CDN (jsdelivr) — only external dependency
- **Port 8002** used by Playwright (not 8000) to avoid conflicts
- To add a new service: add to `modelData[]`, add to `serviceColors{}`, run `pnpm test`
- To add a new attribute: add to the relevant `attributeGroups[]` entry + `attrLabels{}`

## PII Policy

Never embed staff directory URLs (`?id=NNNNNN`), personal email, or promo codes in HTML that gets committed. See solution doc: `_planning/solutions/tooling/git-repo-reorganize-multiversion-pii-cleanup-20260222.md`

---

*Last updated: 2026-02-22*
