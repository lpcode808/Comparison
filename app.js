const modelData = [
    {
        service: "Mistral (LeChat)",
        bestModel: "Mistral Large 2 (123B)",
        liveMode: false,
        reasoning: true,
        research: false,
        webAccess: true,
        generatesImages: "Flux Ultra",
        generatesVideo: false,
        executesCode: true,
        dataAnalysis: true,
        seesImages: true,
        seesVideo: false,
        readsDocs: true,
        sharesThreads: false,
        agentName: false,
        personality: "Adaptive, multilingual, and efficient for both personal and professional tasks",
        superpower: "Fastest inference speed (up to 1,000 words/sec), robust multilingualism, and enterprise-ready deployment"
    },
    {
        service: "OpenAI ChatGPT",
        bestModel: "GPT-4o",
        liveMode: "Full multimodal",
        reasoning: false,
        research: "Basic",
        webAccess: true,
        generatesImages: "DALL-E 3",
        generatesVideo: false,
        executesCode: true,
        dataAnalysis: true,
        seesImages: true,
        seesVideo: "In Live Mode",
        readsDocs: true,
        sharesThreads: true,
        agentName: "Operator",
        personality: "Polished and efficient in text. In live mode, expressive and adaptive.",
        superpower: "Live mode, most versatile set of features and capabilities"
    },
    {
        service: "OpenAI ChatGPT advanced",
        bestModel: "o1/o3 family; Plus $20/mo, Pro $20/mo",
        liveMode: false,
        reasoning: true,
        research: "Advanced",
        webAccess: false,
        generatesImages: false,
        generatesVideo: "Sora",
        executesCode: true,
        dataAnalysis: false,
        seesImages: true,
        seesVideo: false,
        readsDocs: false,
        sharesThreads: true,
        agentName: false,
        personality: "Methodical and analytical",
        superpower: "Very powerful model for complex reasoning tasks, particularly in science, coding, and mathematics"
    },
    {
        service: "Microsoft Copilot",
        bestModel: "Copilot",
        liveMode: "Voice only",
        reasoning: true,
        research: true,
        webAccess: true,
        generatesImages: "DALL-E 3",
        generatesVideo: false,
        executesCode: "Limited",
        dataAnalysis: false,
        seesImages: true,
        seesVideo: false,
        readsDocs: true,
        sharesThreads: false,
        agentName: false,
        personality: "Since it uses different models behind the scenes, a little inconsistent",
        superpower: "Works well with Microsoft products and services"
    },
    {
        service: "Anthropic Claude",
        bestModel: "Claude 3.7",
        liveMode: false,
        reasoning: "extended thinking mode",
        research: false,
        webAccess: false,
        generatesImages: false,
        generatesVideo: false,
        executesCode: true,
        dataAnalysis: "Input CSV",
        seesImages: true,
        seesVideo: false,
        readsDocs: true,
        sharesThreads: false,
        agentName: "computer use via API",
        personality: "Clever and friendly",
        superpower: "Often the most creative and socially engaging model"
    },
    {
        service: "Google Gemini",
        bestModel: "Gemini family",
        liveMode: "Voice only",
        reasoning: "2.0 Flash Thinking",
        research: "Normal Flash",
        webAccess: true,
        generatesImages: "Imagen-3",
        generatesVideo: "Veo (Beta)",
        executesCode: "Limited",
        dataAnalysis: "Limited",
        seesImages: true,
        seesVideo: true,
        readsDocs: true,
        sharesThreads: false,
        agentName: false,
        personality: "Helpful and a bit bland",
        superpower: "Wide variety of features, good connections with search"
    },
    {
        service: "X.ai Grok (Twitter)",
        bestModel: "Grok-2",
        liveMode: false,
        reasoning: false,
        research: "Via Twitter",
        webAccess: "Via Twitter",
        generatesImages: "Aurora",
        generatesVideo: false,
        executesCode: false,
        dataAnalysis: false,
        seesImages: true,
        seesVideo: false,
        readsDocs: true,
        sharesThreads: true,
        agentName: false,
        personality: "Sarcastic and \"fun\" (though you can tone that down)",
        superpower: "Powerful model integrated tightly with X/TWitter"
    },
    {
        service: "DeepSeek",
        bestModel: "DeepSeek v3",
        liveMode: false,
        reasoning: true,
        research: "Limited",
        webAccess: true,
        generatesImages: false,
        generatesVideo: false,
        executesCode: false,
        dataAnalysis: false,
        seesImages: true,
        seesVideo: false,
        readsDocs: "Limited",
        sharesThreads: false,
        agentName: false,
        personality: "Neurotically helpful, warm",
        superpower: "Remarkably cheap and powerful model out of China"
    },
    {
        service: "Perplexity",
        bestModel: "Choose based on preference",
        liveMode: false,
        reasoning: "DeepResearch",
        research: "DeepResearch",
        webAccess: true,
        generatesImages: true,
        generatesVideo: false,
        executesCode: false,
        dataAnalysis: true,
        seesImages: true,
        seesVideo: false,
        readsDocs: true,
        sharesThreads: true,
        agentName: "Comet",
        personality: "Informative and concise",
        superpower: "Select the LLM of choice, and cites web sources well"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Get all attributes except 'service' for rows
    const attributes = [
        'personality',
        'superpower',
        'bestModel',
        'research',
        'webAccess',
        'reasoning',
        'readsDocs',
        'seesImages',
        'seesVideo',
        'executesCode',
        'dataAnalysis',
        'generatesImages',
        'generatesVideo',
        'liveMode',
        'sharesThreads',
        'agentName'
    ];
    
    // Get all services for columns, in specific order
    const services = [
        "OpenAI ChatGPT",
        "OpenAI ChatGPT advanced",
        "Anthropic Claude",
        "Perplexity",
        "Google Gemini",
        "Microsoft Copilot",
        "X.ai Grok (Twitter)",
        "DeepSeek",
        "Mistral (LeChat)"
    ];

    let visibleServices = new Set(services);
    let visibleAttributes = new Set(attributes);

    let currentFilter = { attribute: null, showTrue: null };

    function formatValue(value) {
        if (typeof value === 'boolean') {
            return value ? '<span class="check">✓</span>' : '<span class="cross">✗</span>';
        }
        if (value === null || value === undefined) return '';
        return value;
    }

    function filterByAttribute(attribute) {
        if (currentFilter.attribute === attribute) {
            // Toggle between true-first and false-first
            currentFilter.showTrue = !currentFilter.showTrue;
        } else {
            currentFilter.attribute = attribute;
            currentFilter.showTrue = true;
        }

        // Sort services based on the current filter
        const sortedServices = [...services].sort((a, b) => {
            const valueA = modelData.find(item => item.service === a)[currentFilter.attribute];
            const valueB = modelData.find(item => item.service === b)[currentFilter.attribute];
            
            const isABoolean = typeof valueA === 'boolean';
            const isBBoolean = typeof valueB === 'boolean';
            
            // If both are boolean
            if (isABoolean && isBBoolean) {
                if (currentFilter.showTrue) {
                    return valueA === valueB ? 0 : valueA ? -1 : 1;
                } else {
                    return valueA === valueB ? 0 : valueA ? 1 : -1;
                }
            }
            
            // If one is boolean and one is text
            if (isABoolean && !isBBoolean) {
                // If showing true first: true > text > false
                if (currentFilter.showTrue) {
                    return valueA ? -1 : 1;
                }
                // If showing false first: false > text > true
                else {
                    return valueA ? 1 : -1;
                }
            }
            if (!isABoolean && isBBoolean) {
                // If showing true first: true > text > false
                if (currentFilter.showTrue) {
                    return valueB ? 1 : -1;
                }
                // If showing false first: false > text > true
                else {
                    return valueB ? -1 : 1;
                }
            }
            
            // If both are text, keep original order
            return 0;
        });

        // Update the services order
        services.length = 0;
        services.push(...sortedServices);
        visibleServices = new Set(services);
        renderTable();
    }

    function renderTable() {
        const table = document.querySelector('table');
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');
        thead.innerHTML = '';
        tbody.innerHTML = '';

        // Create header row with services
        const headerRow = document.createElement('tr');
        const cornerCell = document.createElement('th');
        cornerCell.textContent = 'Attribute';
        headerRow.appendChild(cornerCell);

        // Add service columns
        services.forEach(service => {
            if (visibleServices.has(service)) {
                const th = document.createElement('th');
                th.textContent = service;
                headerRow.appendChild(th);
            }
        });
        thead.appendChild(headerRow);

        // Create a row for each attribute
        attributes.forEach(attr => {
            if (!visibleAttributes.has(attr)) return;

            const row = document.createElement('tr');
            
            // Add attribute name cell
            const attrCell = document.createElement('th');
            attrCell.textContent = attr.charAt(0).toUpperCase() + attr.slice(1).replace(/([A-Z])/g, ' $1');
            
            // Add visual indicator for filtered attribute
            if (currentFilter.attribute === attr) {
                attrCell.classList.add('filtered');
                attrCell.textContent += currentFilter.showTrue ? ' (✓)' : ' (✗)';
            }
            
            // Add click handler for attribute filtering
            if (modelData.some(item => typeof item[attr] === 'boolean')) {
                attrCell.style.cursor = 'pointer';
                attrCell.onclick = () => filterByAttribute(attr);
            }
            
            row.appendChild(attrCell);

            // Add data cells for each service
            services.forEach(service => {
                if (visibleServices.has(service)) {
                    const serviceData = modelData.find(item => item.service === service);
                    const td = document.createElement('td');
                    td.innerHTML = formatValue(serviceData[attr]);
                    row.appendChild(td);
                }
            });

            tbody.appendChild(row);
        });
    }

    function filterBySearch() {
        const searchText = document.querySelector('.search-box').value.toLowerCase();
        
        if (!searchText) {
            visibleServices = new Set(services);
        } else {
            visibleServices = new Set(
                services.filter(service => 
                    service.toLowerCase().includes(searchText) ||
                    modelData.find(item => item.service === service && 
                        Object.entries(item).some(([key, value]) => 
                            String(value).toLowerCase().includes(searchText)
                        )
                    )
                )
            );
        }
        renderTable();
    }

    function initializeToggles() {
        const serviceToggles = document.getElementById('service-toggles');
        const attributeToggles = document.getElementById('attribute-toggles');

        // Clear existing toggles
        serviceToggles.innerHTML = '';
        attributeToggles.innerHTML = '';

        // Populate service toggles
        services.forEach(service => {
            const toggle = document.createElement('span');
            toggle.className = 'toggle-item active';
            toggle.textContent = service;
            toggle.onclick = () => {
                toggle.classList.toggle('active');
                if (toggle.classList.contains('active')) {
                    visibleServices.add(service);
                } else {
                    visibleServices.delete(service);
                }
                renderTable();
            };
            serviceToggles.appendChild(toggle);
        });

        // Populate attribute toggles
        attributes.forEach(attr => {
            const toggle = document.createElement('span');
            toggle.className = 'toggle-item active';
            toggle.textContent = attr.charAt(0).toUpperCase() + attr.slice(1).replace(/([A-Z])/g, ' $1');
            toggle.onclick = () => {
                toggle.classList.toggle('active');
                if (toggle.classList.contains('active')) {
                    visibleAttributes.add(attr);
                } else {
                    visibleAttributes.delete(attr);
                }
                renderTable();
            };
            attributeToggles.appendChild(toggle);
        });

        // Add event listeners for show/hide all buttons
        document.querySelector('.show-all-services').onclick = () => {
            visibleServices = new Set(services);
            serviceToggles.querySelectorAll('.toggle-item').forEach(t => t.classList.add('active'));
            renderTable();
        };

        document.querySelector('.hide-all-services').onclick = () => {
            visibleServices.clear();
            serviceToggles.querySelectorAll('.toggle-item').forEach(t => t.classList.remove('active'));
            renderTable();
        };

        document.querySelector('.show-all-attributes').onclick = () => {
            visibleAttributes = new Set(attributes);
            attributeToggles.querySelectorAll('.toggle-item').forEach(t => t.classList.add('active'));
            renderTable();
        };

        document.querySelector('.hide-all-attributes').onclick = () => {
            visibleAttributes.clear();
            attributeToggles.querySelectorAll('.toggle-item').forEach(t => t.classList.remove('active'));
            renderTable();
        };
    }

    // Initialize search
    document.querySelector('.search-box').addEventListener('input', filterBySearch);

    // Add event listeners for instruction toggles
    document.querySelectorAll('.instructions-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('collapsed');
            const content = toggle.nextElementSibling;
            if (content && content.classList.contains('instructions-content')) {
                content.classList.toggle('collapsed');
            }
        });
    });

    // Initialize toggles and render table
    initializeToggles();
    renderTable();
}); 