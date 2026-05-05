QA Engineer Take-Home Challenge: Plane Testing Strategy + Implementation
Context
We use Plane, an open-source project management platform built as an alternative to tools like Jira, Linear, Monday, and ClickUp. The repository is here: https://github.com/makeplane/plane (GitHub)
Task:  fork the repository and design + implement a practical QA test suite across three layers:
1.	Integration tests
2.	End-to-end Playwright tests
________________________________________

End-to-end Playwright tests
Scope chosen
•	User authentication / onboarding
•	Workspace creation
•	Project creation
•	Work item creation and updates  
Why this area.
-	Authentication gates everything. A broken auth flow means 0% of the product
is usable.
-	Work item are the core value unit of Plane. Every other feature (cycles, modules, analytics) depends on issues existing and being in valid states.
________________________________________

Testing pyramid approach
Unit tests -> Integration tests -> E2E tests
What belongs in integration vs E2E tests
Integration:
POST /issues/ creates DB record (pytest + Django)
POST /issues/ without title → 400  (pytest)
PATCH /issues/:id/ updates DB field (pytest)

E2E:
Sign in → create workspace → create project (Playwright)
Create work item → edit title → change state (Playwright)

Key risks
Key Risks Being Tested

1. Authentication — ensure authentication work as expected
2. Data persistence — created work item survive a page reload
3. State transitions — work item state changes persist correctly


How to run tests locally
Make sure frontend is running (only needed for E2E):
`pnpm dev` 
Run E2E Playwright Tests (enter in bash)
cd qa-submission/e2e-tests
npm install
npx playwright install chromium
npx playwright test

Assumptions or setup requirements
- Local dev stack running (Docker + pnpm dev) as described in setup guide
- Test user email: `test123@plane.gmail` / password: `test45W&123`
- User should be created and profile also
- A workspace named `qa-test-workspace` is created during E2E test setup
- Frontend base URL: `http://localhost:3000`

Test result screens:

<img width="1221" height="474" alt="test-complete" src="https://github.com/user-attachments/assets/8f125ec6-bbef-483d-a34d-28ad66152831" />


<img width="1890" height="906" alt="c2" src="https://github.com/user-attachments/assets/4afe2d80-336b-427a-be25-794156970b75" />


<img width="1605" height="990" alt="c1" src="https://github.com/user-attachments/assets/72c74898-9778-445b-bbf0-15e5c690bd61" />


