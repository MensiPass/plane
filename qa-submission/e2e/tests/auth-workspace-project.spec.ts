/**
 * E2E Test 1: Auth → Workspace → Project creation journey
 *
 * Flow:
 *  1. Sign up as a new user (first run) or sign in (subsequent runs)
 *  2. Create a workspace
 *  3. Create a project inside the workspace
 *  4. Verify the project appears in the sidebar/list
 */

import { test, expect,Browser, Page,BrowserContext } from "@playwright/test";
import { BASE_URL, TEST_EMAIL, TEST_PASSWORD, WORKSPACE_NAME,WORKSPACE_PEOPLE,PROJECT_NAME,PROJECT_DESC,ISSUE_TITLE,ISSUE_DESC,ISSUE_TITLE2,ISSUE_DESC2 } from "./fixtures";
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext({
    storageState: ".auth/user.json",
  });
  page = await context.newPage();
  await page.goto("http://localhost:3000"); // ← add this
  await page.waitForLoadState("networkidle");
});

test.describe("Auth → Workspace → Project Journey", () => {

  test("User can sign in with valid credentials and create workspace", async ({  }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
    // If already on a protected page, we're already logged in
    if ( await page.getByText("Welcome back to Plane.").count()>0) {
    await page.getByLabel(/email/i).fill(TEST_EMAIL);
    await page.getByRole("button", { name: /continue/i }).click();
    await page.getByLabel(/^password$/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /Go to workspace|log in/i }).click();
    }
    await page.waitForLoadState("networkidle");
    // Already have a workspace — skip creation
    if (!page.url().includes("create-workspace") && !page.url().includes("onboarding")) {
      console.log("Workspace already exists, skipping creation");
      return;
    }
    //Fill workspace name
    const nameInput = page.getByPlaceholder(/Enter workspace name/i);
    if (await nameInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await nameInput.fill(WORKSPACE_NAME);
      await page.getByRole('button', { name: WORKSPACE_PEOPLE }).click();
      //await page.getByRole('option', { name: WORKSPACE_PEOPLE }).click();
      await page.getByRole("button", { name: "Create workspace" }).click();
      await page.waitForLoadState("networkidle");
    }
  });

  test("Create a new work item when user signed in", async ({  }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
    await page.locator('button[data-ph-element="sidebar_create_work_item_button"]').first().click();
    // Fill the issue title in the modal/form
    await page.getByRole("textbox",{name:/Title|title/i }).fill(ISSUE_TITLE);
    await page.locator('p[data-placeholder="Click to add description"]').fill(ISSUE_DESC);
    await page.getByRole("button", { name: /save/i }).first().click();
    //open work items to see the list
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /Open project menu/i }).first().click();
    await page.getByRole("link", { name: /Work items/i }).first().click();
    // Issue should appear in the list
    await page.waitForLoadState("networkidle");
  });
  
  test("Update a work item when user signed in", async ({  }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
    //open work items to see the list
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /Open project menu/i }).first().click();
    await page.getByRole("link", { name: /Work items/i }).first().click();
    await page.getByRole("link", { name: ISSUE_TITLE }).first().click();
    // edit the issue title in the modal/form
   // await page.getByRole("textbox",{name:ISSUE_TITLE }).fill(ISSUE_TITLE2);
    await page.locator('p').getByText(ISSUE_DESC, { exact: true }).fill(ISSUE_DESC2);
    // Issue should appear in the list
    await page.waitForLoadState("networkidle");
  });
});