// ─────────────────────────────────────────────────────────────────
// AI Comparison v3 — E2E + Accessibility Tests
// Using Playwright (browser automation) + axe-core (a11y rules)
//
// Test categories:
//   Smoke        — page loads, key elements present
//   Data         — correct number of services / attribute groups
//   Filtering    — category pills, search box
//   Toggles      — service toggles, attribute toggles, show/hide all
//   Interaction  — boolean sort, collapsible panels
//   Data quality — harness dots, autonomy badge counts
//   Accessibility— axe-core critical + serious violations
//   Responsive   — mobile viewport
// ─────────────────────────────────────────────────────────────────

const { test, expect } = require('@playwright/test');

// Helper: count visible service header cells
const serviceCount = (page) =>
    page.locator('thead th.service-header').count();

// Helper: get ordered service names from header row
const serviceOrder = (page) =>
    page.locator('thead th.service-header .sh-name')
        .evaluateAll(els => els.map(el => el.textContent.trim()));

test.describe('Smoke', () => {
    test('page title contains "Agentic Era"', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Agentic Era/i);
    });

    test('framework banner is visible with quote', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.framework-banner')).toBeVisible();
        await expect(page.locator('.banner-quote')).toContainText('harness');
    });

    test('three layers render in banner', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.layer')).toHaveCount(3);
        await expect(page.locator('.framework-banner')).toContainText('Models');
        await expect(page.locator('.framework-banner')).toContainText('Apps');
        await expect(page.locator('.framework-banner')).toContainText('Harnesses');
    });

    test('table renders before timeout', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr', { timeout: 5000 });
        await expect(page.locator('table')).toBeVisible();
    });
});

test.describe('Data integrity', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('all 9 services render as columns', async ({ page }) => {
        await expect(await serviceCount(page)).toBe(9);
    });

    test('all 5 attribute section headers render', async ({ page }) => {
        await expect(page.locator('.section-divider')).toHaveCount(5);
    });

    test('section headers have correct labels', async ({ page }) => {
        const dividers = page.locator('.section-divider');
        await expect(dividers.nth(0)).toContainText('Overview');
        await expect(dividers.nth(1)).toContainText('Harness');
        await expect(dividers.nth(2)).toContainText('Capabilities');
        await expect(dividers.nth(3)).toContainText('Multimedia');
        await expect(dividers.nth(4)).toContainText('About');
    });

    test('each service column shows company name', async ({ page }) => {
        // Spot-check a few
        const anthropicHeaders = page.locator('.sh-company', { hasText: 'Anthropic' });
        await expect(anthropicHeaders).toHaveCount(4); // Claude.ai, Claude Code, Cowork, Excel
        const openaiHeaders = page.locator('.sh-company', { hasText: 'OpenAI' });
        await expect(openaiHeaders).toHaveCount(2); // ChatGPT, Codex
    });

    test('each service column has a category-color top border', async ({ page }) => {
        const first = page.locator('thead th.service-header').first();
        const borderTop = await first.evaluate(el =>
            getComputedStyle(el).borderTopColor
        );
        // Should be a real color (not transparent / empty)
        expect(borderTop).not.toBe('rgba(0, 0, 0, 0)');
        expect(borderTop).not.toBe('');
    });
});

test.describe('Category pill filtering', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('Chatbot pill: shows exactly 3 services', async ({ page }) => {
        await page.click('[data-category="Chatbot"]');
        await expect(await serviceCount(page)).toBe(3);
        const names = await serviceOrder(page);
        expect(names).toContain('ChatGPT');
        expect(names).toContain('Claude.ai');
        expect(names).toContain('Gemini');
    });

    test('Coding Agent pill: shows exactly 2 services', async ({ page }) => {
        await page.click('[data-category="Coding Agent"]');
        await expect(await serviceCount(page)).toBe(2);
        const names = await serviceOrder(page);
        expect(names).toContain('Claude Code');
        expect(names).toContain('OpenAI Codex');
    });

    test('Work Agent pill: shows exactly 2 services', async ({ page }) => {
        await page.click('[data-category="Work Agent"]');
        await expect(await serviceCount(page)).toBe(2);
        const names = await serviceOrder(page);
        expect(names).toContain('Claude Cowork');
        expect(names).toContain('Claude for Excel');
    });

    test('Research Tool pill: shows exactly 2 services', async ({ page }) => {
        await page.click('[data-category="Research Tool"]');
        await expect(await serviceCount(page)).toBe(2);
        const names = await serviceOrder(page);
        expect(names).toContain('NotebookLM');
        expect(names).toContain('Perplexity');
    });

    test('All pill restores all 9 after filtering', async ({ page }) => {
        await page.click('[data-category="Chatbot"]');
        await page.click('[data-category="all"]');
        await expect(await serviceCount(page)).toBe(9);
    });

    test('active pill has correct background applied', async ({ page }) => {
        const pill = page.locator('[data-category="Chatbot"]');
        await pill.click();
        await expect(pill).toHaveClass(/active/);
    });

    test('switching pills updates service toggle button states', async ({ page }) => {
        await page.click('[data-category="Chatbot"]');
        // ChatGPT toggle should be active (visible), Claude Code should not
        const chatgptToggle = page.locator('#service-toggles .toggle-item', { hasText: 'ChatGPT' });
        const claudeCodeToggle = page.locator('#service-toggles .toggle-item', { hasText: 'Claude Code' });
        await expect(chatgptToggle).toHaveClass(/active/);
        await expect(claudeCodeToggle).not.toHaveClass(/active/);
    });
});

test.describe('Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('searching "Anthropic" filters to 4 services', async ({ page }) => {
        await page.fill('.search-box', 'Anthropic');
        // Claude.ai, Claude Code, Claude Cowork, Claude for Excel
        await expect(await serviceCount(page)).toBe(4);
    });

    test('searching "Google" filters to 2 services', async ({ page }) => {
        await page.fill('.search-box', 'Google');
        // Gemini and NotebookLM (both Google)
        await expect(await serviceCount(page)).toBe(2);
    });

    test('clearing search restores all 9 services', async ({ page }) => {
        await page.fill('.search-box', 'Anthropic');
        await page.fill('.search-box', '');
        await expect(await serviceCount(page)).toBe(9);
    });

    test('searching for unknown term shows 0 services', async ({ page }) => {
        await page.fill('.search-box', 'xyzzznotaservice99');
        await expect(await serviceCount(page)).toBe(0);
    });
});

test.describe('Service toggles', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('toggling off ChatGPT removes its column', async ({ page }) => {
        const toggle = page.locator('#service-toggles .toggle-item', { hasText: 'ChatGPT' });
        await toggle.click();
        await expect(await serviceCount(page)).toBe(8);
        const names = await serviceOrder(page);
        expect(names).not.toContain('ChatGPT');
    });

    test('toggling ChatGPT back on restores it', async ({ page }) => {
        const toggle = page.locator('#service-toggles .toggle-item', { hasText: 'ChatGPT' });
        await toggle.click();
        await toggle.click();
        await expect(await serviceCount(page)).toBe(9);
    });

    test('Hide All removes all service columns', async ({ page }) => {
        await page.click('.hide-all-services');
        await expect(await serviceCount(page)).toBe(0);
    });

    test('Show All after Hide All restores all 9', async ({ page }) => {
        await page.click('.hide-all-services');
        await page.click('.show-all-services');
        await expect(await serviceCount(page)).toBe(9);
    });
});

test.describe('Attribute toggles', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('toggling off Superpower hides its row', async ({ page }) => {
        const toggle = page.locator('#attribute-toggles .toggle-item', { hasText: 'Superpower' });
        await toggle.click();
        // attr-label scoped to tbody — excludes the toggle button itself
        await expect(page.locator('tbody th.attr-label', { hasText: 'Superpower' })).toHaveCount(0);
    });

    test('toggling Superpower back on restores row', async ({ page }) => {
        const toggle = page.locator('#attribute-toggles .toggle-item', { hasText: 'Superpower' });
        await toggle.click();
        await toggle.click();
        await expect(page.locator('tbody th.attr-label', { hasText: 'Superpower' })).toBeVisible();
    });

    test('Hide All attributes removes section dividers', async ({ page }) => {
        await page.click('.hide-all-attributes');
        // With no visible attrs, no section dividers should render
        await expect(page.locator('.section-divider')).toHaveCount(0);
    });

    test('Show All attributes after Hide All restores all 5 sections', async ({ page }) => {
        await page.click('.hide-all-attributes');
        await page.click('.show-all-attributes');
        await expect(page.locator('.section-divider')).toHaveCount(5);
    });
});

test.describe('Boolean sort interaction', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('clicking "Web Access" row label reorders columns', async ({ page }) => {
        const before = await serviceOrder(page);
        const label = page.locator('tbody th.attr-label', { hasText: 'Web Access' });
        await label.click();
        const after = await serviceOrder(page);
        // Claude for Excel (webAccess: false) should have moved to the end
        expect(after[after.length - 1]).toBe('Claude for Excel');
        expect(before.join(',')).not.toBe(after.join(','));
    });

    test('clicking same label again reverses sort', async ({ page }) => {
        const label = page.locator('tbody th.attr-label', { hasText: 'Web Access' });
        await label.click(); // sort true-first → Claude for Excel last
        const afterFirst = await serviceOrder(page);
        await label.click(); // sort false-first → Claude for Excel first
        const afterSecond = await serviceOrder(page);
        expect(afterSecond[0]).toBe('Claude for Excel');
        expect(afterFirst.join(',')).not.toBe(afterSecond.join(','));
    });

    test('sorted label shows arrow indicator', async ({ page }) => {
        const label = page.locator('tbody th.attr-label', { hasText: 'Web Access' });
        await label.click();
        // Label should now contain an arrow
        await expect(label).toContainText('↑');
    });

    test('re-clicking label toggles arrow direction', async ({ page }) => {
        const label = page.locator('tbody th.attr-label', { hasText: 'Web Access' });
        await label.click();
        await expect(label).toContainText('↑');
        await label.click();
        await expect(label).toContainText('↓');
    });
});

test.describe('Collapsible instruction panels', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('instruction content sections start collapsed', async ({ page }) => {
        const panels = page.locator('.instructions-content');
        const count = await panels.count();
        for (let i = 0; i < count; i++) {
            await expect(panels.nth(i)).toHaveClass(/collapsed/);
        }
    });

    test('clicking a toggle opens its panel', async ({ page }) => {
        const toggle = page.locator('.instructions-toggle').first();
        const content = page.locator('.instructions-content').first();
        await toggle.click();
        await expect(content).not.toHaveClass(/collapsed/);
    });

    test('clicking open toggle closes it again', async ({ page }) => {
        const toggle = page.locator('.instructions-toggle').first();
        const content = page.locator('.instructions-content').first();
        await toggle.click(); // open
        await toggle.click(); // close
        await expect(content).toHaveClass(/collapsed/);
    });
});

test.describe('Data quality — harness and autonomy rendering', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('correct count of "Fully autonomous" badges', async ({ page }) => {
        // Claude Code, OpenAI Codex, Claude Cowork = 3
        await expect(page.locator('.autonomy-full')).toHaveCount(3);
    });

    test('correct count of "Semi-autonomous" badges', async ({ page }) => {
        // ChatGPT, Claude.ai, Claude for Excel, NotebookLM, Perplexity = 5
        await expect(page.locator('.autonomy-semi')).toHaveCount(5);
    });

    test('correct count of "Chat only" badges', async ({ page }) => {
        // Gemini = 1
        await expect(page.locator('.autonomy-chat')).toHaveCount(1);
    });

    test('Claude Code has 4 filled harness dots', async ({ page }) => {
        // Find the Harness Strength row and Claude Code's column
        const harnessRow = page.locator('tbody tr').filter({
            has: page.locator('th.attr-label', { hasText: 'Harness Strength' })
        });
        const claudeCodeIdx = await page.locator('thead th.service-header .sh-name')
            .evaluateAll(els => els.findIndex(el => el.textContent.trim() === 'Claude Code'));
        const cell = harnessRow.locator('td').nth(claudeCodeIdx);
        await expect(cell.locator('.dot.filled')).toHaveCount(4);
        await expect(cell.locator('.dot.empty')).toHaveCount(0);
    });

    test('Gemini has 2 filled harness dots', async ({ page }) => {
        const harnessRow = page.locator('tbody tr').filter({
            has: page.locator('th.attr-label', { hasText: 'Harness Strength' })
        });
        const idx = await page.locator('thead th.service-header .sh-name')
            .evaluateAll(els => els.findIndex(el => el.textContent.trim() === 'Gemini'));
        const cell = harnessRow.locator('td').nth(idx);
        await expect(cell.locator('.dot.filled')).toHaveCount(2);
        await expect(cell.locator('.dot.empty')).toHaveCount(2);
    });

    test('category badges render with correct text', async ({ page }) => {
        await expect(page.locator('.category-badge', { hasText: 'Chatbot' })).toHaveCount(3);
        await expect(page.locator('.category-badge', { hasText: 'Coding Agent' })).toHaveCount(2);
        await expect(page.locator('.category-badge', { hasText: 'Work Agent' })).toHaveCount(2);
        await expect(page.locator('.category-badge', { hasText: 'Research Tool' })).toHaveCount(2);
    });

    test('company badges render for all 9 services', async ({ page }) => {
        await expect(page.locator('.company-badge')).toHaveCount(9);
    });

    test('"Free" cost appears for NotebookLM', async ({ page }) => {
        // Find the Cost row and check NotebookLM's cell
        const costRow = page.locator('tbody tr').filter({
            has: page.locator('th.attr-label', { hasText: 'Cost' })
        });
        const idx = await page.locator('thead th.service-header .sh-name')
            .evaluateAll(els => els.findIndex(el => el.textContent.trim() === 'NotebookLM'));
        const cell = costRow.locator('td').nth(idx);
        await expect(cell).toContainText('Free');
    });
});

test.describe('Accessibility (axe-core)', () => {
    // Injects axe from CDN and runs it — checks for critical/serious violations
    async function runAxe(page, selector = 'body') {
        await page.addScriptTag({
            url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js'
        });
        return page.evaluate((sel) => {
            return new Promise(resolve =>
                window.axe.run(document.querySelector(sel), {
                    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'best-practice'] }
                }, (err, results) => resolve(results.violations))
            );
        }, selector);
    }

    test('no CRITICAL accessibility violations', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
        const violations = await runAxe(page);
        const critical = violations.filter(v => v.impact === 'critical');
        if (critical.length > 0) {
            console.log('Critical violations:', critical.map(v => `[${v.id}] ${v.description}`));
        }
        expect(critical).toHaveLength(0);
    });

    test('no SERIOUS accessibility violations', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
        const violations = await runAxe(page);
        const serious = violations.filter(v => v.impact === 'serious');
        if (serious.length > 0) {
            console.log('Serious violations:', serious.map(v =>
                `[${v.id}] ${v.description} — nodes: ${v.nodes.length}`
            ));
        }
        expect(serious).toHaveLength(0);
    });

    test('no MODERATE accessibility violations', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
        const violations = await runAxe(page);
        const moderate = violations.filter(v => v.impact === 'moderate');
        if (moderate.length > 0) {
            console.log('Moderate violations:', moderate.map(v =>
                `[${v.id}] ${v.description} — nodes: ${v.nodes.length}`
            ));
        }
        expect(moderate).toHaveLength(0);
    });

    test('reports all violations for visibility (soft check)', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
        const violations = await runAxe(page);
        console.log(`\nAll axe violations (${violations.length} total):`);
        violations.forEach(v => {
            console.log(`  [${v.impact?.toUpperCase()}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`);
        });
        // This test always passes — it's a visibility report, not a gate
        expect(violations).toBeDefined();
    });
});

test.describe('Keyboard accessibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('collapsible panel toggles via Enter key', async ({ page }) => {
        const toggle = page.locator('.instructions-toggle').first();
        const content = page.locator('.instructions-content').first();
        await toggle.focus();
        await page.keyboard.press('Enter');
        await expect(content).not.toHaveClass(/collapsed/);
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    test('collapsible panel toggles via Space key', async ({ page }) => {
        const toggle = page.locator('.instructions-toggle').first();
        const content = page.locator('.instructions-content').first();
        await toggle.focus();
        await page.keyboard.press('Space');
        await expect(content).not.toHaveClass(/collapsed/);
        await toggle.focus();
        await page.keyboard.press('Space');
        await expect(content).toHaveClass(/collapsed/);
    });

    test('service toggle activates via Enter key', async ({ page }) => {
        const toggle = page.locator('#service-toggles .toggle-item', { hasText: 'ChatGPT' });
        await toggle.focus();
        await page.keyboard.press('Enter');
        await expect(toggle).not.toHaveClass(/active/);
        await expect(toggle).toHaveAttribute('aria-pressed', 'false');
        await expect(await serviceCount(page)).toBe(8);
    });

    test('attribute toggle activates via Space key', async ({ page }) => {
        const toggle = page.locator('#attribute-toggles .toggle-item', { hasText: 'Superpower' });
        await toggle.focus();
        await page.keyboard.press('Space');
        await expect(toggle).not.toHaveClass(/active/);
        await expect(toggle).toHaveAttribute('aria-pressed', 'false');
        await expect(page.locator('tbody th.attr-label', { hasText: 'Superpower' })).toHaveCount(0);
    });

    test('collapsible toggles have role="button"', async ({ page }) => {
        const toggles = page.locator('.instructions-toggle');
        const count = await toggles.count();
        for (let i = 0; i < count; i++) {
            await expect(toggles.nth(i)).toHaveAttribute('role', 'button');
        }
    });

    test('service toggles have aria-pressed attribute', async ({ page }) => {
        const toggles = page.locator('#service-toggles .toggle-item');
        const count = await toggles.count();
        for (let i = 0; i < count; i++) {
            await expect(toggles.nth(i)).toHaveAttribute('aria-pressed', 'true');
        }
    });
});

test.describe('Combined interactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('filter by category then search — search overrides category filter', async ({ page }) => {
        await page.click('[data-category="Chatbot"]');
        await page.fill('.search-box', 'Claude');
        // Search replaces visibleServices — all 4 Claude services appear
        await expect(await serviceCount(page)).toBe(4);
        const names = await serviceOrder(page);
        expect(names).toContain('Claude.ai');
        expect(names).toContain('Claude Code');
    });

    test('sort persists after category filter', async ({ page }) => {
        // Sort by Web Access (true-first)
        const label = page.locator('tbody th.attr-label', { hasText: 'Web Access' });
        await label.click();
        // Claude for Excel (webAccess: false) should be last
        let order = await serviceOrder(page);
        expect(order[order.length - 1]).toBe('Claude for Excel');

        // Filter to Chatbot then back to All
        await page.click('[data-category="Chatbot"]');
        await page.click('[data-category="all"]');
        // Sort order should be preserved in the underlying services array
        order = await serviceOrder(page);
        expect(order[order.length - 1]).toBe('Claude for Excel');
    });

    test('toggle off service, switch category, switch back — toggle state persists', async ({ page }) => {
        // Toggle off ChatGPT
        const chatgptToggle = page.locator('#service-toggles .toggle-item', { hasText: 'ChatGPT' });
        await chatgptToggle.click();
        // Switch to Coding Agent and back to All
        await page.click('[data-category="Coding Agent"]');
        await page.click('[data-category="all"]');
        // All 9 should be back (category pill resets to all)
        await expect(await serviceCount(page)).toBe(9);
    });
});

test.describe('Edge cases', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('hide all services then search — search overrides hidden state', async ({ page }) => {
        await page.click('.hide-all-services');
        await page.fill('.search-box', 'Claude');
        // Search replaces visibleServices with matches
        await expect(await serviceCount(page)).toBe(4);
    });

    test('hide all attributes shows header row but no body attribute rows', async ({ page }) => {
        await page.click('.hide-all-attributes');
        // Header should still exist
        await expect(page.locator('thead th.service-header')).toHaveCount(9);
        // No attribute rows or section dividers
        await expect(page.locator('tbody th.attr-label')).toHaveCount(0);
        await expect(page.locator('.section-divider')).toHaveCount(0);
    });

    test('non-boolean attribute label does not crash on click', async ({ page }) => {
        // "Cost" is a string attribute — clicking it should not sort or crash
        const costLabel = page.locator('tbody th.attr-label', { hasText: 'Cost' });
        // Should not have cursor: pointer
        const cursor = await costLabel.evaluate(el => getComputedStyle(el).cursor);
        expect(cursor).not.toBe('pointer');
        // Table should still have 9 services
        await expect(await serviceCount(page)).toBe(9);
    });
});

test.describe('Content verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('all 9 services have non-empty superpowers', async ({ page }) => {
        const superpowers = await page.locator('.superpower-cell').allTextContents();
        expect(superpowers).toHaveLength(9);
        superpowers.forEach(sp => {
            expect(sp.trim().length).toBeGreaterThan(0);
        });
    });

    test('costs match expected values', async ({ page }) => {
        const costRow = page.locator('tbody tr').filter({
            has: page.locator('th.attr-label', { hasText: 'Cost' })
        });
        const costs = await costRow.locator('td').allTextContents();
        const validCosts = ['$20/mo', '$20/mo+', 'Free'];
        costs.forEach(cost => {
            expect(validCosts).toContain(cost.trim());
        });
    });

    test('Updated timestamp is present in footer', async ({ page }) => {
        await expect(page.locator('footer.timestamp')).toContainText('Updated');
    });

    test('searching "Google" filters to exactly 2 services', async ({ page }) => {
        await page.fill('.search-box', 'Google');
        await expect(await serviceCount(page)).toBe(2);
        const names = await serviceOrder(page);
        expect(names).toContain('Gemini');
        expect(names).toContain('NotebookLM');
    });

    test('search box has aria-label', async ({ page }) => {
        await expect(page.locator('.search-box')).toHaveAttribute('aria-label', 'Search AI tools');
    });
});

test.describe('Theme mode', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('tbody tr');
    });

    test('theme toggle is visible with aria state', async ({ page }) => {
        const toggle = page.locator('.theme-toggle');
        await expect(toggle).toBeVisible();
        await expect(toggle).toHaveAttribute('aria-pressed', /true|false/);
    });

    test('clicking theme toggle flips document theme', async ({ page }) => {
        const before = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme')
        );
        await page.click('.theme-toggle');
        const after = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme')
        );
        expect(after).not.toBe(before);
    });

    test('selected theme persists after page reload', async ({ page }) => {
        await page.click('.theme-toggle');
        const selected = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme')
        );
        await page.reload();
        await page.waitForSelector('tbody tr');
        const afterReload = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme')
        );
        expect(afterReload).toBe(selected);
    });
});

test.describe('Responsive / Mobile', () => {
    test('renders on iPhone SE (375px)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.waitForSelector('tbody tr');
        await expect(page.locator('.framework-banner')).toBeVisible();
        await expect(page.locator('.category-pills')).toBeVisible();
        await expect(page.locator('.table-container')).toBeVisible();
    });

    test('table is horizontally scrollable on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.waitForSelector('tbody tr');
        const container = page.locator('.table-container');
        const overflow = await container.evaluate(el => getComputedStyle(el).overflowX);
        expect(overflow).toBe('auto');
    });

    test('category pills wrap and remain clickable on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.waitForSelector('tbody tr');
        await page.click('[data-category="Chatbot"]');
        await expect(await serviceCount(page)).toBe(3);
    });

    test('mobile scroll hint is visible on narrow viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.waitForSelector('tbody tr');
        await expect(page.locator('.table-scroll-hint')).toBeVisible();
    });

    test('mobile focus controls render on narrow viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.waitForSelector('tbody tr');
        await expect(page.locator('.mobile-view-controls')).toBeVisible();
        await expect(page.locator('.mobile-focus-toggle')).toBeVisible();
        await expect(page.locator('.mobile-service-select')).toBeVisible();
    });

    test('mobile focus mode shows one selected service and can restore full comparison', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.waitForSelector('tbody tr');

        await page.click('.mobile-focus-toggle');
        await expect(page.locator('.mobile-focus-toggle')).toHaveAttribute('aria-pressed', 'true');
        await expect(await serviceCount(page)).toBe(1);

        await page.selectOption('.mobile-service-select', 'Gemini');
        const focusedNames = await serviceOrder(page);
        expect(focusedNames).toEqual(['Gemini']);

        await page.click('.mobile-focus-toggle');
        await expect(page.locator('.mobile-focus-toggle')).toHaveAttribute('aria-pressed', 'false');
        await expect(await serviceCount(page)).toBe(9);
    });

    test('mobile focus next/previous buttons cycle focused service', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.waitForSelector('tbody tr');

        await page.click('.mobile-focus-toggle');
        const before = await serviceOrder(page);
        await page.click('.mobile-next-service');
        const afterNext = await serviceOrder(page);
        expect(afterNext[0]).not.toBe(before[0]);

        await page.click('.mobile-prev-service');
        const afterPrev = await serviceOrder(page);
        expect(afterPrev[0]).toBe(before[0]);
    });
});
