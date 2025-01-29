const modelData = [
    {
        service: "OpenAI ChatGPT",
        bestModel: "GPT-4o",
        liveMode: "Full multimodal",
        reasoning: false,
        webAccess: true,
        generatesImages: "DALL-E3",
        executesCode: true,
        dataAnalysis: true,
        seesImages: true,
        seesVideo: "In Live Mode",
        readsDocs: true,
        personality: "Polished and efficient in text. In live mode, expressive and adaptive.",
        superpower: "Live mode, most versatile set of features and capabilities"
    },
    {
        service: "Claude",
        bestModel: "o1/o3 family",
        liveMode: false,
        reasoning: true,
        webAccess: false,
        generatesImages: false,
        executesCode: true,
        dataAnalysis: false,
        seesImages: true,
        seesVideo: false,
        readsDocs: false,
        personality: "Methodical and analytical",
        superpower: "Very powerful model for complex reasoning tasks, particularly in science, coding, and mathematics"
    },
    {
        service: "Microsoft Copilot",
        bestModel: "Copilot",
        liveMode: "Voice only",
        reasoning: true,
        webAccess: true,
        generatesImages: "DALL-E3",
        executesCode: "Limited",
        dataAnalysis: false,
        seesImages: true,
        seesVideo: false,
        readsDocs: true,
        personality: "Since it uses different models behind the scenes, a little inconsistent",
        superpower: "Works well with Microsoft products and services"
    },
    {
        service: "Anthropic Claude",
        bestModel: "Claude 3.5",
        liveMode: false,
        reasoning: false,
        webAccess: false,
        generatesImages: false,
        executesCode: true,
        dataAnalysis: "Limited",
        seesImages: true,
        seesVideo: false,
        readsDocs: true,
        personality: "Clever and friendly",
        superpower: "Often the most creative and socially engaging model"
    },
    {
        service: "Google Gemini",
        bestModel: "Gemini family",
        liveMode: "Voice only",
        reasoning: true,
        webAccess: true,
        generatesImages: "Imagen-3",
        executesCode: "Limited",
        dataAnalysis: "Limited",
        seesImages: true,
        seesVideo: true,
        readsDocs: true,
        personality: "Helpful and a bit bland",
        superpower: "Wide variety of features, good connections with search"
    },
    {
        service: "X.ai Grok",
        bestModel: "Grok-2",
        liveMode: false,
        reasoning: false,
        webAccess: "Mostly X",
        generatesImages: "Aurora",
        executesCode: false,
        dataAnalysis: false,
        seesImages: true,
        seesVideo: false,
        readsDocs: true,
        personality: "Sarcastic and \"fun\" (though you can tone that down)",
        superpower: "Powerful model integrated tightly with X"
    },
    {
        service: "DeepSeek",
        bestModel: "DeepSeek v3",
        liveMode: false,
        reasoning: true,
        webAccess: true,
        generatesImages: false,
        executesCode: false,
        dataAnalysis: false,
        seesImages: true,
        seesVideo: false,
        readsDocs: "Limited",
        personality: "Neurotically helpful, warm",
        superpower: "Remarkably cheap and powerful model out of China"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Get all attributes except 'service' for rows
    const attributes = [
        'personality',
        'webAccess',
        'superpower',
        'readsDocs',
        'seesImages',
        'generatesImages',
        'seesVideo',
        'executesCode',
        'reasoning',
        'liveMode',
        'bestModel'
    ];
    
    // Get all services for columns
    const services = modelData.map(item => item.service);

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
            // Toggle between true and false only
            currentFilter.showTrue = !currentFilter.showTrue;
        } else {
            currentFilter.attribute = attribute;
            currentFilter.showTrue = true;
        }

        // Apply the filter
        visibleServices = new Set(
            services.filter(service => {
                const value = modelData.find(item => item.service === service)[currentFilter.attribute];
                return typeof value === 'boolean' && value === currentFilter.showTrue;
            })
        );
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

    // Initialize instructions toggle
    const instructionsToggle = document.querySelector('.instructions-toggle');
    const instructionsContent = document.querySelector('.instructions-content');
    
    instructionsToggle.addEventListener('click', () => {
        instructionsToggle.classList.toggle('collapsed');
        instructionsContent.classList.toggle('collapsed');
    });

    // Start with instructions collapsed
    instructionsToggle.click();

    // Initialize toggles and render table
    initializeToggles();
    renderTable();
}); 