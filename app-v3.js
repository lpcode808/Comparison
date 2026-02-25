// ─────────────────────────────────────────────
// AI COMPARISON v3 — The Agentic Era
// Based on Ethan Mollick's Feb 2026 guide:
// "A Guide to Which AI to Use in the Agentic Era"
// ─────────────────────────────────────────────

// Used only for decorative colored dot (not text), so no contrast requirement
const companyColors = {
    "OpenAI":       "#10a37f",
    "Anthropic":    "#d97757",
    "Google":       "#4285f4",
    "Perplexity AI":"#20b2aa"
};

// Toggle button colors: company brand hue, darkened for WCAG 4.5:1 on white.
// App/chatbot = lighter shade; Harness/agent = darker shade of same hue.
const serviceColors = {
    // OpenAI — teal green family
    "ChatGPT":         "#0c7a5e",   // app layer    (5.3:1)
    "OpenAI Codex":    "#0a6248",   // harness      (7.4:1)

    // Anthropic — warm terra cotta family
    "Claude.ai":       "#9e4e2c",   // app layer    (5.9:1)
    "Claude Code":     "#7a3018",   // harness      (9.3:1)
    "Claude Cowork":   "#8c3d20",   // harness      (7.5:1)
    "Claude for Excel":"#8c3d20",   // harness      (7.5:1)

    // Google — blue family
    "Gemini":          "#1a65c4",   // app layer    (5.7:1)
    "NotebookLM":      "#0d4ea3",   // research     (8.0:1)

    // Perplexity — teal
    "Perplexity":      "#17808a"    //              (4.7:1)
};

const categoryColors = {
    "Chatbot":        "#7c3aed",
    "Coding Agent":   "#b91c1c", // darkened: #dc2626 was 4.19:1 on badge bg, needs 4.5:1
    "Work Agent":     "#92400e",  // dark enough for 4.5:1 on badge bg
    "Research Tool":  "#047857"   // dark enough for 4.5:1 on badge bg
};

const categoryEmojis = {
    "Chatbot":        "💬",
    "Coding Agent":   "💻",
    "Work Agent":     "📁",
    "Research Tool":  "🔍"
};

const darkCategoryBadgeStyles = {
    "Chatbot":       { bg: "rgba(124, 58, 237, 0.24)", border: "rgba(196, 181, 253, 0.45)", text: "#c4b5fd" },
    "Coding Agent":  { bg: "rgba(185, 28, 28, 0.24)", border: "rgba(252, 165, 165, 0.45)", text: "#fca5a5" },
    "Work Agent":    { bg: "rgba(146, 64, 14, 0.24)", border: "rgba(253, 186, 116, 0.45)", text: "#fdba74" },
    "Research Tool": { bg: "rgba(4, 120, 87, 0.24)", border: "rgba(110, 231, 183, 0.45)", text: "#6ee7b7" }
};

// ─── DATA MODEL ───────────────────────────────
// harnessStrength: 1=Basic, 2=Moderate, 3=Strong, 4=Powerful
// autonomy: "Chat only" | "Semi-autonomous" | "Fully autonomous"

const modelData = [
    {
        service: "ChatGPT",
        company: "OpenAI",
        category: "Chatbot",
        underlyingModel: "GPT-5.2 Thinking",
        cost: "$20/mo",
        technicalLevel: "Beginner",
        autonomy: "Semi-autonomous",
        harnessStrength: 3,
        webAccess: true,
        extendedThinking: "Thinking Extended",
        deepResearch: true,
        executesCode: true,
        managesFiles: false,
        createsDocuments: true,
        seesImages: true,
        seesVideo: "Live Mode",
        generatesImages: "DALL-E",
        generatesVideo: false,
        readsDocs: true,
        superpower: "Most complete all-in-one chatbot; creates real Excel and PowerPoint files; Shopping Research is underrated"
    },
    {
        service: "Claude.ai",
        company: "Anthropic",
        category: "Chatbot",
        underlyingModel: "Claude Opus 4.6",
        cost: "$20/mo",
        technicalLevel: "Beginner",
        autonomy: "Semi-autonomous",
        harnessStrength: 3,
        webAccess: true,
        extendedThinking: "Toggle on",
        deepResearch: true,
        executesCode: true,
        managesFiles: false,
        createsDocuments: true,
        seesImages: true,
        seesVideo: false,
        generatesImages: false,
        generatesVideo: false,
        readsDocs: true,
        superpower: "Best writing quality; gateway to Claude Code and Cowork via Claude Desktop app"
    },
    {
        service: "Gemini",
        company: "Google",
        category: "Chatbot",
        underlyingModel: "Gemini 3.1 Pro",
        cost: "$20/mo",
        technicalLevel: "Beginner",
        autonomy: "Chat only",
        harnessStrength: 2,
        webAccess: true,
        extendedThinking: "Deep Think (paid)",
        deepResearch: true,
        executesCode: false,
        managesFiles: false,
        createsDocuments: false,
        seesImages: true,
        seesVideo: true,
        generatesImages: "Imagen-3",
        generatesVideo: "Veo 3.1",
        readsDocs: true,
        superpower: "Best image & video generation bundled; model quality matches rivals, but harness is significantly weaker"
    },
    {
        service: "Claude Code",
        company: "Anthropic",
        category: "Coding Agent",
        underlyingModel: "Claude Opus 4.6",
        cost: "$20/mo+",
        technicalLevel: "Advanced",
        autonomy: "Fully autonomous",
        harnessStrength: 4,
        webAccess: true,
        extendedThinking: true,
        deepResearch: true,
        executesCode: true,
        managesFiles: true,
        createsDocuments: true,
        seesImages: true,
        seesVideo: false,
        generatesImages: false,
        generatesVideo: false,
        readsDocs: true,
        superpower: "Build and launch complete apps; writes, runs, tests code for hours; can set up Stripe payments and deploy sites"
    },
    {
        service: "OpenAI Codex",
        company: "OpenAI",
        category: "Coding Agent",
        underlyingModel: "GPT-5.3-Codex",
        cost: "$20/mo+",
        technicalLevel: "Advanced",
        autonomy: "Fully autonomous",
        harnessStrength: 4,
        webAccess: true,
        extendedThinking: true,
        deepResearch: false,
        executesCode: true,
        managesFiles: true,
        createsDocuments: false,
        seesImages: true,
        seesVideo: false,
        generatesImages: false,
        generatesVideo: false,
        readsDocs: true,
        superpower: "OpenAI's full coding agent: access to codebase, terminal, write/run/test cycle in cloud environment"
    },
    {
        service: "Claude Cowork",
        company: "Anthropic",
        category: "Work Agent",
        underlyingModel: "Claude Opus 4.6",
        cost: "$20/mo+",
        technicalLevel: "Intermediate",
        autonomy: "Fully autonomous",
        harnessStrength: 4,
        webAccess: true,
        extendedThinking: true,
        deepResearch: true,
        executesCode: false,
        managesFiles: true,
        createsDocuments: true,
        seesImages: true,
        seesVideo: false,
        generatesImages: false,
        generatesVideo: false,
        readsDocs: true,
        superpower: "Claude Code for non-coders: works on local files and browser in secure VM; now with plugins for Google Workspace, Slack, and DocuSign"
    },
    {
        service: "Claude for Excel",
        company: "Anthropic",
        category: "Work Agent",
        underlyingModel: "Claude Opus 4.6",
        cost: "$20/mo+",
        technicalLevel: "Beginner",
        autonomy: "Semi-autonomous",
        harnessStrength: 3,
        webAccess: false,
        extendedThinking: false,
        deepResearch: false,
        executesCode: true,
        managesFiles: false,
        createsDocuments: true,
        seesImages: false,
        seesVideo: false,
        generatesImages: false,
        generatesVideo: false,
        readsDocs: true,
        superpower: "Junior analyst inside Excel; reads multi-tab workbooks, explains calculations with cell citations, edits pivot tables and charts"
    },
    {
        service: "NotebookLM",
        company: "Google",
        category: "Research Tool",
        underlyingModel: "Gemini 3.1 Pro",
        cost: "Free tier",
        technicalLevel: "Beginner",
        autonomy: "Semi-autonomous",
        harnessStrength: 2,
        webAccess: true,
        extendedThinking: false,
        deepResearch: true,
        executesCode: false,
        managesFiles: false,
        createsDocuments: true,
        seesImages: true,
        seesVideo: false,
        generatesImages: false,
        generatesVideo: false,
        readsDocs: true,
        superpower: "Best tool for document sense-making; creates AI podcasts, slides, and interactive knowledge bases from your sources"
    },
    {
        service: "Perplexity",
        company: "Perplexity AI",
        category: "Research Tool",
        underlyingModel: "Choice of models",
        cost: "$20/mo",
        technicalLevel: "Beginner",
        autonomy: "Semi-autonomous",
        harnessStrength: 2,
        webAccess: true,
        extendedThinking: "Deep Research",
        deepResearch: true,
        executesCode: false,
        managesFiles: false,
        createsDocuments: false,
        seesImages: true,
        seesVideo: false,
        generatesImages: true,
        generatesVideo: false,
        readsDocs: true,
        superpower: "Best cited web research with source verification; pick your underlying AI model; Comet agent available"
    }
];

// ─── ATTRIBUTE GROUPS ─────────────────────────
const attributeGroups = [
    {
        label: "Overview",
        icon: "📋",
        attrs: ['company', 'category', 'underlyingModel', 'cost', 'technicalLevel']
    },
    {
        label: "Harness",
        icon: "⚙️",
        attrs: ['autonomy', 'harnessStrength']
    },
    {
        label: "Capabilities",
        icon: "🛠️",
        attrs: ['webAccess', 'extendedThinking', 'deepResearch', 'executesCode', 'managesFiles', 'createsDocuments', 'readsDocs']
    },
    {
        label: "Multimedia",
        icon: "🎨",
        attrs: ['seesImages', 'seesVideo', 'generatesImages', 'generatesVideo']
    },
    {
        label: "About",
        icon: "✨",
        attrs: ['superpower']
    }
];

const attrLabels = {
    company:         "Company",
    category:        "Category",
    underlyingModel: "Underlying Model",
    cost:            "Cost",
    technicalLevel:  "Technical Level",
    autonomy:        "Autonomy",
    harnessStrength: "Harness Strength",
    webAccess:       "Web Access",
    extendedThinking:"Extended Thinking",
    deepResearch:    "Deep Research",
    executesCode:    "Runs Code",
    managesFiles:    "Manages Files",
    createsDocuments:"Creates Docs",
    seesImages:      "Sees Images",
    seesVideo:       "Sees Video",
    generatesImages: "Generates Images",
    generatesVideo:  "Generates Video",
    readsDocs:       "Reads Docs",
    superpower:      "Superpower"
};

const attributes = attributeGroups.flatMap(g => g.attrs);

// ─── APP INIT ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const fuse = new Fuse(modelData, {
        keys: ['service', 'company', 'underlyingModel', 'superpower', 'category'],
        threshold: 0.3
    });

    let services = modelData.map(m => m.service);
    let visibleServices = new Set(services);
    let visibleAttributes = new Set(attributes);
    let currentFilter = { attribute: null, showTrue: null };
    let activeCategoryFilter = 'all';
    const themeToggle = document.querySelector('.theme-toggle');
    const mobileFocusToggle = document.querySelector('.mobile-focus-toggle');
    const mobileServiceSelect = document.querySelector('.mobile-service-select');
    const mobilePrevService = document.querySelector('.mobile-prev-service');
    const mobileNextService = document.querySelector('.mobile-next-service');
    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const THEME_KEY = 'comparison-theme';
    let mobileFocusMode = false;
    let mobileFocusedService = services[0] || '';

    function readSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY);
        } catch {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch {
            // Ignore storage errors (private mode / blocked storage).
        }
    }

    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    function updateThemeToggle(theme) {
        if (!themeToggle) return;
        const isDark = theme === 'dark';
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
    }

    function applyTheme(theme, persist = true) {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeToggle(theme);
        if (persist) saveTheme(theme);
        renderTable();
    }

    function initTheme() {
        const saved = readSavedTheme();
        const initialTheme = saved || (themeMedia.matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', initialTheme);
        updateThemeToggle(initialTheme);

        const handleSystemThemeChange = event => {
            if (readSavedTheme()) return;
            applyTheme(event.matches ? 'dark' : 'light', false);
        };

        if (typeof themeMedia.addEventListener === 'function') {
            themeMedia.addEventListener('change', handleSystemThemeChange);
        } else if (typeof themeMedia.addListener === 'function') {
            themeMedia.addListener(handleSystemThemeChange);
        }

        themeToggle?.addEventListener('click', () => {
            const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
            applyTheme(next, true);
        });
    }

    function getBaseVisibleServices() {
        return services.filter(s => visibleServices.has(s));
    }

    function updateMobileFocusControls(baseVisible = getBaseVisibleServices()) {
        if (!mobileFocusToggle || !mobileServiceSelect || !mobilePrevService || !mobileNextService) return;

        if (baseVisible.length > 0 && !baseVisible.includes(mobileFocusedService)) {
            mobileFocusedService = baseVisible[0];
        }

        mobileFocusToggle.setAttribute('aria-pressed', String(mobileFocusMode));
        mobileFocusToggle.setAttribute(
            'aria-label',
            mobileFocusMode ? 'Disable focused service view' : 'Enable focused service view'
        );
        mobileFocusToggle.textContent = mobileFocusMode ? '📱 Focus on' : '📱 Focus one service';

        mobileServiceSelect.innerHTML = '';
        if (baseVisible.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No visible services';
            mobileServiceSelect.appendChild(option);
            mobileServiceSelect.disabled = true;
            mobilePrevService.disabled = true;
            mobileNextService.disabled = true;
            return;
        }

        baseVisible.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            mobileServiceSelect.appendChild(option);
        });

        mobileServiceSelect.value = mobileFocusedService;
        mobileServiceSelect.disabled = !mobileFocusMode;
        const navDisabled = !mobileFocusMode || baseVisible.length <= 1;
        mobilePrevService.disabled = navDisabled;
        mobileNextService.disabled = navDisabled;
    }

    function cycleMobileFocus(direction) {
        const baseVisible = getBaseVisibleServices();
        if (baseVisible.length === 0) return;
        const currentIndex = Math.max(0, baseVisible.indexOf(mobileFocusedService));
        const nextIndex = (currentIndex + direction + baseVisible.length) % baseVisible.length;
        mobileFocusedService = baseVisible[nextIndex];
        renderTable();
    }

    function initMobileFocusControls() {
        if (!mobileFocusToggle || !mobileServiceSelect || !mobilePrevService || !mobileNextService) return;

        mobileFocusToggle.addEventListener('click', () => {
            mobileFocusMode = !mobileFocusMode;
            const baseVisible = getBaseVisibleServices();
            if (mobileFocusMode && baseVisible.length > 0 && !baseVisible.includes(mobileFocusedService)) {
                mobileFocusedService = baseVisible[0];
            }
            updateMobileFocusControls(baseVisible);
            renderTable();
        });

        mobileServiceSelect.addEventListener('change', e => {
            mobileFocusedService = e.target.value;
            renderTable();
        });

        mobilePrevService.addEventListener('click', () => cycleMobileFocus(-1));
        mobileNextService.addEventListener('click', () => cycleMobileFocus(1));

        updateMobileFocusControls();
    }

    // ─── CATEGORY PILL FILTER ─────────────────
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeCategoryFilter = pill.dataset.category;
            syncCategoryToToggles();
            renderTable();
        });
    });

    function syncCategoryToToggles() {
        if (activeCategoryFilter === 'all') {
            visibleServices = new Set(services);
        } else {
            visibleServices = new Set(
                services.filter(s => {
                    const d = modelData.find(m => m.service === s);
                    return d && d.category === activeCategoryFilter;
                })
            );
        }
        document.querySelectorAll('#service-toggles .toggle-item').forEach(toggle => {
            const isActive = visibleServices.has(toggle.dataset.service);
            toggle.classList.toggle('active', isActive);
            toggle.setAttribute('aria-pressed', String(isActive));
        });
    }

    // ─── VALUE FORMATTERS ─────────────────────
    function formatHarnessStrength(value) {
        const n = parseInt(value);
        if (isNaN(n)) return value;
        const labels = ['', 'Basic', 'Moderate', 'Strong', 'Powerful'];
        let dots = '';
        for (let i = 0; i < 4; i++) {
            dots += `<span class="dot ${i < n ? 'filled' : 'empty'}"></span>`;
        }
        return `<span class="harness-strength-wrap"><span class="harness-dots">${dots}</span><span class="harness-label">${labels[n] || ''}</span></span>`;
    }

    function formatAutonomy(value) {
        const cls = {
            'Chat only':          'autonomy-chat',
            'Semi-autonomous':    'autonomy-semi',
            'Fully autonomous':   'autonomy-full'
        };
        return `<span class="autonomy-badge ${cls[value] || ''}">${value}</span>`;
    }

    function formatCategory(value) {
        const color = categoryColors[value] || '#666';
        const emoji = categoryEmojis[value] || '';
        if (getCurrentTheme() === 'dark') {
            const dark = darkCategoryBadgeStyles[value] || {
                bg: 'rgba(148, 163, 184, 0.24)',
                border: 'rgba(148, 163, 184, 0.45)',
                text: '#cbd5e1'
            };
            return `<span class="category-badge" style="background:${dark.bg};color:${dark.text};border-color:${dark.border}">${emoji} ${value}</span>`;
        }
        return `<span class="category-badge" style="background:${color}18;color:${color};border-color:${color}40">${emoji} ${value}</span>`;
    }

    function formatCompany(value) {
        const color = companyColors[value] || '#888';
        return `<span class="company-badge" style="border-left-color:${color}">${value}</span>`;
    }

    function formatValue(attr, value) {
        if (attr === 'harnessStrength') return formatHarnessStrength(value);
        if (attr === 'autonomy')        return formatAutonomy(value);
        if (attr === 'category')        return formatCategory(value);
        if (attr === 'company')         return formatCompany(value);
        if (typeof value === 'boolean') {
            return value
                ? '<span class="check">✓</span>'
                : '<span class="cross">✗</span>';
        }
        if (value === null || value === undefined) return '';
        return value;
    }

    // ─── SORT BY ATTRIBUTE ────────────────────
    function filterByAttribute(attribute) {
        if (currentFilter.attribute === attribute) {
            currentFilter.showTrue = !currentFilter.showTrue;
        } else {
            currentFilter.attribute = attribute;
            currentFilter.showTrue = true;
        }

        const sorted = [...services].sort((a, b) => {
            const va = modelData.find(m => m.service === a)[currentFilter.attribute];
            const vb = modelData.find(m => m.service === b)[currentFilter.attribute];
            const aB = typeof va === 'boolean';
            const bB = typeof vb === 'boolean';

            if (aB && bB) {
                return currentFilter.showTrue
                    ? (va === vb ? 0 : va ? -1 : 1)
                    : (va === vb ? 0 : va ? 1 : -1);
            }
            if (aB && !bB) return currentFilter.showTrue ? (va ? -1 : 1) : (va ? 1 : -1);
            if (!aB && bB) return currentFilter.showTrue ? (vb ? 1 : -1) : (vb ? -1 : 1);
            return 0;
        });

        services.length = 0;
        services.push(...sorted);
        syncCategoryToToggles();
        renderTable();
    }

    // ─── RENDER TABLE ─────────────────────────
    function renderTable() {
        const thead = document.querySelector('thead');
        const tbody = document.querySelector('tbody');
        thead.innerHTML = '';
        tbody.innerHTML = '';

        const baseVisible = getBaseVisibleServices();
        if (mobileFocusMode && baseVisible.length > 0 && !baseVisible.includes(mobileFocusedService)) {
            mobileFocusedService = baseVisible[0];
        }
        const visible = mobileFocusMode
            ? (baseVisible.length > 0 ? [mobileFocusedService] : [])
            : baseVisible;
        updateMobileFocusControls(baseVisible);

        // Header row
        const headerRow = document.createElement('tr');
        const cornerTh = document.createElement('th');
        cornerTh.textContent = 'Attribute';
        cornerTh.className = 'corner-cell';
        headerRow.appendChild(cornerTh);

        visible.forEach(service => {
            const data = modelData.find(m => m.service === service);
            const th = document.createElement('th');
            th.className = 'service-header';
            const catColor = categoryColors[data.category] || '#666';
            const coColor = companyColors[data.company] || '#888';
            th.style.borderTop = `4px solid ${catColor}`;
            // Company shown as decorative dot + dark text (avoids color-contrast issue on light header bg)
            th.innerHTML = `
                <span class="sh-name">${service}</span>
                <span class="sh-company"><span class="co-dot" style="background:${coColor}" aria-hidden="true"></span>${data.company}</span>
            `;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Body rows with group section headers
        attributeGroups.forEach(group => {
            const groupAttrs = group.attrs.filter(a => visibleAttributes.has(a));
            if (groupAttrs.length === 0) return;

            // Section divider
            const divRow = document.createElement('tr');
            const divCell = document.createElement('td');
            divCell.className = 'section-divider';
            divCell.colSpan = 1 + visible.length;
            divCell.innerHTML = `${group.icon} <strong>${group.label}</strong>`;
            divRow.appendChild(divCell);
            tbody.appendChild(divRow);

            // Attribute rows
            groupAttrs.forEach(attr => {
                const row = document.createElement('tr');

                const attrTh = document.createElement('th');
                attrTh.className = 'attr-label';
                attrTh.textContent = attrLabels[attr] || attr;

                if (currentFilter.attribute === attr) {
                    attrTh.classList.add('filtered');
                    attrTh.textContent += currentFilter.showTrue ? ' ↑' : ' ↓';
                }

                if (modelData.some(item => typeof item[attr] === 'boolean')) {
                    attrTh.style.cursor = 'pointer';
                    attrTh.title = 'Click to sort';
                    attrTh.onclick = () => filterByAttribute(attr);
                }

                row.appendChild(attrTh);

                visible.forEach(service => {
                    const d = modelData.find(m => m.service === service);
                    const td = document.createElement('td');
                    td.innerHTML = formatValue(attr, d[attr]);
                    if (attr === 'superpower') td.className = 'superpower-cell';
                    row.appendChild(td);
                });

                tbody.appendChild(row);
            });
        });
    }

    // ─── SEARCH ───────────────────────────────
    document.querySelector('.search-box').addEventListener('input', e => {
        const q = e.target.value.trim();
        if (!q) {
            syncCategoryToToggles();
        } else {
            const hits = new Set(fuse.search(q).map(r => r.item.service));
            visibleServices = new Set(services.filter(s => hits.has(s)));
        }
        renderTable();
    });

    // ─── TOGGLES ──────────────────────────────
    function initToggles() {
        const svcContainer  = document.getElementById('service-toggles');
        const attrContainer = document.getElementById('attribute-toggles');
        svcContainer.innerHTML  = '';
        attrContainer.innerHTML = '';

        services.forEach(service => {
            const data = modelData.find(m => m.service === service);
            const svcColor = serviceColors[service] || categoryColors[data.category] || '#666';
            const toggle = document.createElement('span');
            toggle.className = 'toggle-item active';
            toggle.dataset.service = service;
            toggle.textContent = service;
            toggle.setAttribute('tabindex', '0');
            toggle.setAttribute('role', 'button');
            toggle.setAttribute('aria-pressed', 'true');
            toggle.style.setProperty('--cat-color', svcColor);
            function handleToggle() {
                // Reset category filter to "all" when manually toggling
                activeCategoryFilter = 'all';
                document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
                document.querySelector('.category-pill[data-category="all"]').classList.add('active');

                toggle.classList.toggle('active');
                const isActive = toggle.classList.contains('active');
                toggle.setAttribute('aria-pressed', String(isActive));
                if (isActive) {
                    visibleServices.add(service);
                } else {
                    visibleServices.delete(service);
                }
                renderTable();
            }
            toggle.addEventListener('click', handleToggle);
            toggle.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle();
                }
            });
            svcContainer.appendChild(toggle);
        });

        attributes.forEach(attr => {
            const toggle = document.createElement('span');
            toggle.className = 'toggle-item active attr-toggle';
            toggle.textContent = attrLabels[attr] || attr;
            toggle.setAttribute('tabindex', '0');
            toggle.setAttribute('role', 'button');
            toggle.setAttribute('aria-pressed', 'true');
            function handleAttrToggle() {
                toggle.classList.toggle('active');
                const isActive = toggle.classList.contains('active');
                toggle.setAttribute('aria-pressed', String(isActive));
                if (isActive) {
                    visibleAttributes.add(attr);
                } else {
                    visibleAttributes.delete(attr);
                }
                renderTable();
            }
            toggle.addEventListener('click', handleAttrToggle);
            toggle.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAttrToggle();
                }
            });
            attrContainer.appendChild(toggle);
        });

        document.querySelector('.show-all-services').onclick = () => {
            visibleServices = new Set(services);
            svcContainer.querySelectorAll('.toggle-item').forEach(t => {
                t.classList.add('active');
                t.setAttribute('aria-pressed', 'true');
            });
            renderTable();
        };
        document.querySelector('.hide-all-services').onclick = () => {
            visibleServices.clear();
            svcContainer.querySelectorAll('.toggle-item').forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-pressed', 'false');
            });
            renderTable();
        };
        document.querySelector('.show-all-attributes').onclick = () => {
            visibleAttributes = new Set(attributes);
            attrContainer.querySelectorAll('.toggle-item').forEach(t => {
                t.classList.add('active');
                t.setAttribute('aria-pressed', 'true');
            });
            renderTable();
        };
        document.querySelector('.hide-all-attributes').onclick = () => {
            visibleAttributes.clear();
            attrContainer.querySelectorAll('.toggle-item').forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-pressed', 'false');
            });
            renderTable();
        };
    }

    // ─── COLLAPSIBLE SECTIONS ─────────────────
    document.querySelectorAll('.instructions-toggle').forEach(toggle => {
        function togglePanel() {
            toggle.classList.toggle('collapsed');
            const content = toggle.nextElementSibling;
            if (content?.classList.contains('instructions-content')) {
                content.classList.toggle('collapsed');
            }
            const isExpanded = !content?.classList.contains('collapsed');
            toggle.setAttribute('aria-expanded', String(isExpanded));
        }
        toggle.addEventListener('click', togglePanel);
        toggle.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePanel();
            }
        });
    });

    // ─── BOOT ─────────────────────────────────
    initTheme();
    initMobileFocusControls();
    initToggles();
    renderTable();
});
