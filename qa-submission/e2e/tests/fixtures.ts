import { test as base, expect, Page } from "@playwright/test";

// data needed for test
export const BASE_URL = "http://localhost:3000";
export const TEST_EMAIL = "test123@plane.gmail";
export const TEST_PASSWORD = "test45W&123";
export const TEST_FULLNAME = "Test User!";
export const WORKSPACE_NAME = "Test work";
export const WORKSPACE_SLUG = "testwork78"; //must be unique
export const WORKSPACE_PEOPLE = "Just myself";

export const PROJECT_NAME = "E2E Test Project work";
export const PROJECT_DESC = "E2E Test Project Description";

export const ISSUE_TITLE= "Test work item title new002";
export const  ISSUE_DESC= "Test work item description002";

export const ISSUE_TITLE2= "Test work item title new001";
export const  ISSUE_DESC2= "Test work item description001";
export { expect };