import {defineConfig, devices} from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : 1,
  timeout: 45000,
  reporter: [['list'], ['html', {open:'never'}], ['json', {outputFile:'test-results/browser-results.json'}]],
  use: {baseURL:'http://127.0.0.1:4179', trace:'retain-on-failure', screenshot:'only-on-failure'},
  webServer: {
    command:'node scripts/browser-test-server.mjs',
    url:'http://127.0.0.1:4179/ar',
    reuseExistingServer:false,
    timeout:60000,
  },
  projects: [
    {name:'chromium',use:{...devices['Desktop Chrome']}},
    {name:'firefox',use:{...devices['Desktop Firefox']}},
    {name:'webkit',use:{...devices['Desktop Safari']}},
    {name:'chrome',use:{...devices['Desktop Chrome'],channel:'chrome'}},
    {name:'edge',use:{...devices['Desktop Edge'],channel:'msedge'}},
    {name:'mobile-chrome',use:{...devices['Pixel 7']}},
    {name:'mobile-webkit',use:{...devices['iPhone 13']}},
    {name:'tablet-webkit',use:{...devices['iPad (gen 7)']}},
  ],
})
