# Development Log

## 2026-03-24 — Cascade audit before public share

### Context
Audited Codex's recent work (commits 0a42900..02cf761) before sharing the tool publicly. Cross-referenced all data against Mollick's Feb 2026 source article.

### What passed
- All 77 Playwright tests pass (smoke, data, filtering, toggles, sort, a11y, mobile)
- Zero axe-core WCAG AA violations (critical, serious, moderate)
- Framework banner, category pills, search, dark mode, mobile focus mode all solid
- Code quality and architecture are clean

### Fixes made
1. **ChatGPT `createsDocuments` → `true`** — Mollick explicitly shows ChatGPT creating spreadsheets and PowerPoints
2. **Claude Code `deepResearch` → `false`** — terminal coding agent doesn't have the chatbot-style Deep Research feature
3. **Perplexity `generatesVideo` → `false`** — research tool, no video generation capability
4. **Footer timestamp** → updated from 2026-03-18 to 2026-03-24

### Flagged but not changed
- **Gemini model "3.1 Pro"** — Mollick source says "3 Pro" / "3.0 Pro"; Codex updated to "3.1 Pro" in a fact-check commit. Kept as-is (likely a newer release).

### Round 2 fixes (after Justin's feedback)
5. **Claude Code `deepResearch` → `true`** (reverted) — confirmed via official Claude Code docs: built-in research subagents (Explore, Plan, General-purpose) with web search capabilities. "Complex research, multi-step operations" is a documented core capability.
6. **Claude Code model → "Claude Sonnet 4.6 / Opus 4.6"** — added .6 suffix to match current model versions, consistent with Claude.ai listing.

### Tests after all fixes
77/77 passed (58s)

### What remains
- Verify Mollick article link resolves: https://www.oneusefulthing.org/p/a-guide-to-which-ai-to-use-in-the
- Consider if any new services should be added (e.g., Google Antigravity mentioned by Mollick but not in the table)
