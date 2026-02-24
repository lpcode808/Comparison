# Comparison v3: AI Tools in the Agentic Era

Interactive comparison tool for AI services using Ethan Mollick's **Models -> Apps -> Harnesses** lens.

Built with vanilla HTML/CSS/JS, no build step, and designed for GitHub Pages deployment.

## Quick Start

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Run tests:
   ```bash
   pnpm test
   ```
3. Optional local preview:
   ```bash
   python3 -m http.server 8000
   ```
   Open [http://localhost:8000](http://localhost:8000).

## Current App Structure

- `index.html` -> v3 UI and all styles
- `app-v3.js` -> data model, filtering/sorting/toggles, rendering logic
- `tests/v3.spec.js` -> Playwright E2E + accessibility + mobile tests
- `v1/` -> archived 2025 version

## Key Features

- Category pill filtering (`Chatbot`, `Coding Agent`, `Work Agent`, `Research Tool`)
- Boolean-row click sorting (true-first / false-first)
- Service and attribute visibility toggles
- Fuzzy search with Fuse.js
- Harness strength dot visualization
- Theme toggle with persisted light/dark mode
- Mobile form-factor UX:
  - touch-friendly control sizing
  - swipe hint for table comparison
  - **focus one service** mode (next/prev + selector)

## Scripts

- `pnpm test` -> run Playwright suite (Chromium)
- `pnpm test:headed` -> run tests with visible browser
- `pnpm test:report` -> open last Playwright report

## Notes

- Playwright uses port `8002` via `playwright.config.js`.
- Keep PII out of committed content.
- Main data source: Mollick Feb 2026 guide + project-specific updates.
