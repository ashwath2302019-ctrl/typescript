# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locators-actions.spec.ts >> Locator Chaining and Filtering >> finds Rahul's Remove button using filter
- Location: tests\locators-actions.spec.ts:67:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('intern-list').locator(':scope > div').filter({ has: getByRole('heading', { name: 'Rahul', exact: true }) }).getByRole('button', { name: 'Remove', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('intern-list').locator(':scope > div').filter({ has: getByRole('heading', { name: 'Rahul', exact: true }) }).getByRole('button', { name: 'Remove', exact: true })

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
  1   | import {
  2   |   test,
  3   |   expect,
  4   |   type Page,
  5   | } from '@playwright/test';
  6   | 
  7   | async function waitForInterns(
  8   |   page: Page,
  9   | ): Promise<void> {
  10  |   await expect(
  11  |     page.getByRole('button', {
  12  |       name: 'Remove',
  13  |       exact: true,
  14  |     }),
  15  |   ).toHaveCount(4);
  16  | }
  17  | 
  18  | function internList(page: Page) {
  19  |   return page.getByTestId('intern-list');
  20  | }
  21  | 
  22  | function internCards(page: Page) {
  23  |   return internList(page).locator(':scope > div');
  24  | }
  25  | 
  26  | function internCard(
  27  |   page: Page,
  28  |   name: string,
  29  | ) {
  30  |   return internCards(page).filter({
  31  |     has: page.getByRole('heading', {
  32  |       name,
  33  |       exact: true,
  34  |     }),
  35  |   });
  36  | }
  37  | 
  38  | function nameInput(page: Page) {
  39  |   return page.getByRole('textbox', {
  40  |     name: 'Intern Name',
  41  |     exact: true,
  42  |   });
  43  | }
  44  | 
  45  | function scoreInput(page: Page) {
  46  |   return page.getByRole('spinbutton', {
  47  |     name: 'Score',
  48  |     exact: true,
  49  |   });
  50  | }
  51  | 
  52  | function searchInput(page: Page) {
  53  |   return page.getByRole('textbox', {
  54  |     name: 'Search by name or role',
  55  |     exact: true,
  56  |   });
  57  | }
  58  | 
  59  | test.describe(
  60  |   'Locator Chaining and Filtering',
  61  |   () => {
  62  |     test.beforeEach(async ({ page }) => {
  63  |       await page.goto('/');
  64  |       await waitForInterns(page);
  65  |     });
  66  | 
  67  |     test(
  68  |       "finds Rahul's Remove button using filter",
  69  |       async ({ page }) => {
  70  |         const rahulCard = internCard(
  71  |           page,
  72  |           'Rahul',
  73  |         );
  74  | 
  75  |         const removeButton =
  76  |           rahulCard.getByRole('button', {
  77  |             name: 'Remove',
  78  |             exact: true,
  79  |           });
  80  | 
> 81  |         await expect(removeButton).toBeVisible();
      |                                    ^ Error: expect(locator).toBeVisible() failed
  82  |       },
  83  |     );
  84  | 
  85  |     test(
  86  |       "finds Priya's score using filter and chaining",
  87  |       async ({ page }) => {
  88  |         const priyaCard = internCard(
  89  |           page,
  90  |           'Priya',
  91  |         );
  92  | 
  93  |         await expect(priyaCard).toBeVisible();
  94  | 
  95  |         await expect(
  96  |           priyaCard.getByText('Score: 78', {
  97  |             exact: true,
  98  |           }),
  99  |         ).toBeVisible();
  100 |       },
  101 |     );
  102 | 
  103 |     // Task 1.1 Comment:
  104 |     // filter({ hasText: 'Priya' }) is safer than nth(1) because it finds
  105 |     // Priya using her name. If the card order changes, it still finds her card.
  106 | 
  107 |     test(
  108 |       'counts only the cards that show Pass status',
  109 |       async ({ page }) => {
  110 |         const passingCards =
  111 |           internCards(page).filter({
  112 |             has: page.getByText(
  113 |               'Status: Pass',
  114 |               {
  115 |                 exact: true,
  116 |               },
  117 |             ),
  118 |           });
  119 | 
  120 |         await expect(passingCards).toHaveCount(3);
  121 |       },
  122 |     );
  123 | 
  124 |     test(
  125 |       'counts only the cards that show Fail status',
  126 |       async ({ page }) => {
  127 |         const failingCards =
  128 |           internCards(page).filter({
  129 |             has: page.getByText(
  130 |               'Status: Fail',
  131 |               {
  132 |                 exact: true,
  133 |               },
  134 |             ),
  135 |           });
  136 | 
  137 |         await expect(failingCards).toHaveCount(1);
  138 |       },
  139 |     );
  140 | 
  141 |     // Task 1.2 Comment:
  142 |     // hasText checks whether the card contains the given text anywhere.
  143 |     // has checks whether the card contains an element matching another locator,
  144 |     // so it is more specific when searching for a nested element.
  145 | 
  146 |     test(
  147 |       'first Remove button belongs to the first intern',
  148 |       async ({ page }) => {
  149 |         const firstRemove = page
  150 |           .getByRole('button', {
  151 |             name: 'Remove',
  152 |             exact: true,
  153 |           })
  154 |           .first();
  155 | 
  156 |         await expect(firstRemove).toBeVisible();
  157 |       },
  158 |     );
  159 | 
  160 |     test(
  161 |       'last Remove button belongs to the last intern',
  162 |       async ({ page }) => {
  163 |         const lastRemove = page
  164 |           .getByRole('button', {
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
```