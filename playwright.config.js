const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:8002',
        screenshot: 'only-on-failure',
        video: 'off',
    },
    webServer: {
        command: 'python3 -m http.server 8002',
        port: 8002,
        reuseExistingServer: true,
        timeout: 10000,
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } }
    ],
});
