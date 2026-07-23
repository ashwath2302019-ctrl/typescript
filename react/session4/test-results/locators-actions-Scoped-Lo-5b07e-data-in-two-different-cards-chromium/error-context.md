# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locators-actions.spec.ts >> Scoped Locators >> asserts different data in two different cards
- Location: tests\locators-actions.spec.ts:248:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('intern-list').locator(':scope > div').filter({ has: getByRole('heading', { name: 'Rahul', exact: true }) }).getByText('Status: Pass', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('intern-list').locator(':scope > div').filter({ has: getByRole('heading', { name: 'Rahul', exact: true }) }).getByText('Status: Pass', { exact: true })

```

```yaml
- heading "Intern Dashboard" [level=1]
- navigation:
  - text: Intern Dashboard
  - button "Switch to Dark Mode"
- main:
  - paragraph: Intern Card Content
  - paragraph: Logged in as:Rahul
  - text: Admin
  - paragraph: Intern Card Content
  - paragraph: Logged in as:Rahul
  - text: Admin
  - paragraph: "Highest: 95 | Lowest: 45 | Avg: 78"
  - paragraph: "Passing: 3 of 4"
  - form "Add Intern":
    - text: Intern Name
    - textbox "Intern Name":
      - /placeholder: Name
    - text: Score
    - spinbutton "Score": "0"
    - checkbox "Present" [checked]
    - text: Present Role
    - combobox "Role":
      - option "Frontend" [selected]
      - option "Backend"
      - option "Fullstack"
    - button "Add Intern"
    - button "Reset"
  - textbox "Search by name or role"
  - heading "Rahul" [level=3]
  - paragraph: "Score: 92"
  - paragraph: "Role: Frontend"
  - paragraph: "Status: Pass"
  - button "Remove"
  - heading "Priya" [level=3]
  - paragraph: "Score: 78"
  - paragraph: "Role: Backend"
  - paragraph: "Status: Pass"
  - button "Remove"
  - heading "Amit" [level=3]
  - paragraph: "Score: 45"
  - paragraph: "Role: Frontend"
  - paragraph: "Status: Fail"
  - button "Remove"
  - heading "Sneha" [level=3]
  - paragraph: "Score: 95"
  - paragraph: "Role: Fullstack"
  - paragraph: "Status: Pass"
  - button "Remove"
  - paragraph: "Basic: 0"
  - button "+"
  - button "-"
  - button "Reset"
  - paragraph: "Bounded (0–10): 5"
  - button "+"
  - button "-"
  - paragraph: "Step 5: 0"
  - button "+5"
  - button "-5"
```

# Test source

```ts
  165 |             name: 'Remove',
  166 |             exact: true,
  167 |           })
  168 |           .last();
  169 | 
  170 |         await expect(lastRemove).toBeVisible();
  171 |       },
  172 |     );
  173 | 
  174 |     test(
  175 |       'second card is accessible by index',
  176 |       async ({ page }) => {
  177 |         const secondCard =
  178 |           internCards(page).nth(1);
  179 | 
  180 |         await expect(secondCard).toBeVisible();
  181 | 
  182 |         await expect(
  183 |           secondCard.getByRole('heading', {
  184 |             name: 'Priya',
  185 |             exact: true,
  186 |           }),
  187 |         ).toBeVisible();
  188 |       },
  189 |     );
  190 | 
  191 |     test(
  192 |       'removes the first intern using first',
  193 |       async ({ page }) => {
  194 |         const removeButtons =
  195 |           page.getByRole('button', {
  196 |             name: 'Remove',
  197 |             exact: true,
  198 |           });
  199 | 
  200 |         await removeButtons.first().click();
  201 | 
  202 |         await expect(removeButtons).toHaveCount(3);
  203 |       },
  204 |     );
  205 | 
  206 |     // Task 1.3 Comment:
  207 |     // first(), last() and nth() depend on the current element order.
  208 |     // If the list order changes, they may select a different intern.
  209 |     // Filtering with a unique name is safer when targeting a specific person.
  210 |   },
  211 | );
  212 | 
  213 | test.describe('Scoped Locators', () => {
  214 |   test.beforeEach(async ({ page }) => {
  215 |     await page.goto('/');
  216 |     await waitForInterns(page);
  217 |   });
  218 | 
  219 |   test(
  220 |     "asserts score and status inside Rahul's card only",
  221 |     async ({ page }) => {
  222 |       const rahulCard = internCard(
  223 |         page,
  224 |         'Rahul',
  225 |       );
  226 | 
  227 |       await expect(
  228 |         rahulCard.getByText('Score: 92', {
  229 |           exact: true,
  230 |         }),
  231 |       ).toBeVisible();
  232 | 
  233 |       await expect(
  234 |         rahulCard.getByText('Status: Pass', {
  235 |           exact: true,
  236 |         }),
  237 |       ).toBeVisible();
  238 | 
  239 |       await expect(
  240 |         rahulCard.getByRole('button', {
  241 |           name: 'Remove',
  242 |           exact: true,
  243 |         }),
  244 |       ).toBeVisible();
  245 |     },
  246 |   );
  247 | 
  248 |   test(
  249 |     'asserts different data in two different cards',
  250 |     async ({ page }) => {
  251 |       const rahulCard = internCard(
  252 |         page,
  253 |         'Rahul',
  254 |       );
  255 | 
  256 |       const amitCard = internCard(
  257 |         page,
  258 |         'Amit',
  259 |       );
  260 | 
  261 |       await expect(
  262 |         rahulCard.getByText('Status: Pass', {
  263 |           exact: true,
  264 |         }),
> 265 |       ).toBeVisible();
      |         ^ Error: expect(locator).toBeVisible() failed
  266 | 
  267 |       await expect(
  268 |         amitCard.getByText('Status: Fail', {
  269 |           exact: true,
  270 |         }),
  271 |       ).toBeVisible();
  272 |     },
  273 |   );
  274 | 
  275 |   // Task 2.1 Comment:
  276 |   // Scoped locators prevent Playwright from matching repeated elements
  277 |   // from the wrong card. They make sure the score, status and button
  278 |   // being tested all belong to the intended intern.
  279 | 
  280 |   test(
  281 |     'fills the form using scoped locators on the form container',
  282 |     async ({ page }) => {
  283 |       const form = page.getByRole('form', {
  284 |         name: 'Add Intern',
  285 |         exact: true,
  286 |       });
  287 | 
  288 |       await form
  289 |         .getByRole('textbox', {
  290 |           name: 'Intern Name',
  291 |           exact: true,
  292 |         })
  293 |         .fill('Vikram');
  294 | 
  295 |       await form
  296 |         .getByRole('spinbutton', {
  297 |           name: 'Score',
  298 |           exact: true,
  299 |         })
  300 |         .fill('75');
  301 | 
  302 |       await form
  303 |         .getByRole('button', {
  304 |           name: 'Add Intern',
  305 |           exact: true,
  306 |         })
  307 |         .click();
  308 | 
  309 |       await expect(
  310 |         page.getByRole('heading', {
  311 |           name: 'Vikram',
  312 |           exact: true,
  313 |         }),
  314 |       ).toBeVisible();
  315 |     },
  316 |   );
  317 | 
  318 |   // Task 2.2 Comment:
  319 |   // Scoping prevents a test from filling a similar input in another form.
  320 |   // It also prevents clicking the wrong button when different sections
  321 |   // contain buttons with the same accessible name.
  322 | });
  323 | 
  324 | test.describe('Actions', () => {
  325 |   test.beforeEach(async ({ page }) => {
  326 |     await page.goto('/');
  327 |     await waitForInterns(page);
  328 |   });
  329 | 
  330 |   test(
  331 |     'fill sets the input value directly',
  332 |     async ({ page }) => {
  333 |       const internNameInput =
  334 |         nameInput(page);
  335 | 
  336 |       await internNameInput.fill('Vikram');
  337 | 
  338 |       await expect(
  339 |         internNameInput,
  340 |       ).toHaveValue('Vikram');
  341 |     },
  342 |   );
  343 | 
  344 |   test(
  345 |     'selectOption selects by visible label text',
  346 |     async ({ page }) => {
  347 |       const roleSelect =
  348 |         page.getByRole('combobox', {
  349 |           name: 'Role',
  350 |           exact: true,
  351 |         });
  352 | 
  353 |       await roleSelect.selectOption({
  354 |         label: 'Backend',
  355 |       });
  356 | 
  357 |       await expect(
  358 |         roleSelect,
  359 |       ).toHaveValue('Backend');
  360 |     },
  361 |   );
  362 | 
  363 |   test(
  364 |     'selectOption selects by value attribute',
  365 |     async ({ page }) => {
```