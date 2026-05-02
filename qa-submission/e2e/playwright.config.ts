import { defineConfig, devices } from "@playwright/test";



export default defineConfig({
  workers: 1,
  testDir: "./tests",
  timeout: 60_000,
  retries: 1,
  globalSetup: "./global-setup.ts",
  use: {
    baseURL: "http://localhost:3000",
    headless: false,            // set to false to watch tests run
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    storageState: ".auth/user.json" //same context for all tests, no need to sign in every time
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: [["html", { open: "never" }], ["list"]],
});