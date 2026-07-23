# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locators-actions.spec.ts >> Locator Chaining and Filtering >> second card is accessible by index
- Location: tests\locators-actions.spec.ts:174:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('intern-list').locator(':scope > div').nth(1)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('intern-list').locator(':scope > div').nth(1)

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
  80  | 
  81  |         await expect(removeButton).toBeVisible();
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
> 180 |         await expect(secondCard).toBeVisible();
      |                                  ^ Error: expect(locator).toBeVisible() failed
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
  265 |       ).toBeVisible();
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
```