import { chromium, FullConfig } from "@playwright/test";
import { BASE_URL, TEST_EMAIL, TEST_PASSWORD } from "./tests/fixtures";

//file with shared session
export const AUTH_FILE = ".auth/user.json";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${BASE_URL}/`);
  await page.waitForLoadState("networkidle");

  // Save the authenticated session to auth file so it is shared between tests(not needed but sppeds test by bypassing sign-in for every test)
  await page.context().storageState({ path: AUTH_FILE });
  console.log("Auth state saved to", AUTH_FILE);

  await browser.close();
}

export default globalSetup;