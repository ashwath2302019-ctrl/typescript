# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locators-actions.spec.ts >> Locator Chaining and Filtering >> counts only the cards that show Fail status
- Location: tests\locators-actions.spec.ts:124:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('intern-list').locator(':scope > div').filter({ has: getByText('Status: Fail', { exact: true }) })
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for getByTestId('intern-list').locator(':scope > div').filter({ has: getByText('Status: Fail', { exact: true }) })
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "Intern Dashboard" [level=1] [ref=e3]
  - navigation [ref=e4]:
    - generic [ref=e5]: Intern Dashboard
    - button "Switch to Dark Mode" [ref=e6]
  - main [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e9]:
        - paragraph [ref=e10]: Intern Card Content
        - generic [ref=e11]:
          - paragraph [ref=e12]: Logged in as:Rahul
          - text: Admin
      - generic [ref=e13]:
        - paragraph [ref=e14]: Intern Card Content
        - generic [ref=e15]:
          - paragraph [ref=e16]: Logged in as:Rahul
          - text: Admin
    - generic [ref=e17]:
      - paragraph [ref=e18]: "Highest: 95 | Lowest: 45 | Avg: 78"
      - paragraph [ref=e19]: "Passing: 3 of 4"
    - form "Add Intern" [ref=e20]:
      - generic [ref=e21]:
        - text: Intern Name
        - textbox "Intern Name" [ref=e22]:
          - /placeholder: Name
      - generic [ref=e23]:
        - text: Score
        - spinbutton "Score" [ref=e24]: "0"
      - generic [ref=e25]:
        - checkbox "Present" [checked] [ref=e26]
        - text: Present
      - generic [ref=e27]:
        - text: Role
        - combobox "Role" [ref=e28]:
          - option "Frontend" [selected]
          - option "Backend"
          - option "Fullstack"
      - button "Add Intern" [ref=e29]
      - button "Reset" [ref=e30]
    - generic [ref=e31]:
      - textbox "Search by name or role" [ref=e32]
      - generic [ref=e33]:
        - generic [ref=e34]:
          - heading "Rahul" [level=3] [ref=e35]
          - paragraph [ref=e36]: "Score: 92"
          - paragraph [ref=e37]: "Role: Frontend"
          - paragraph [ref=e38]: "Status: Pass"
          - button "Remove" [ref=e39]
        - generic [ref=e40]:
          - heading "Priya" [level=3] [ref=e41]
          - paragraph [ref=e42]: "Score: 78"
          - paragraph [ref=e43]: "Role: Backend"
          - paragraph [ref=e44]: "Status: Pass"
          - button "Remove" [ref=e45]
        - generic [ref=e46]:
          - heading "Amit" [level=3] [ref=e47]
          - paragraph [ref=e48]: "Score: 45"
          - paragraph [ref=e49]: "Role: Frontend"
          - paragraph [ref=e50]: "Status: Fail"
          - button "Remove" [ref=e51]
        - generic [ref=e52]:
          - heading "Sneha" [level=3] [ref=e53]
          - paragraph [ref=e54]: "Score: 95"
          - paragraph [ref=e55]: "Role: Fullstack"
          - paragraph [ref=e56]: "Status: Pass"
          - button "Remove" [ref=e57]
    - generic [ref=e58]:
      - generic [ref=e59]:
        - paragraph [ref=e60]: "Basic: 0"
        - button "+" [ref=e61]
        - button "-" [ref=e62]
        - button "Reset" [ref=e63]
      - generic [ref=e64]:
        - paragraph [ref=e65]: "Bounded (0–10): 5"
        - button "+" [ref=e66]
        - button "-" [ref=e67]
      - generic [ref=e68]:
        - paragraph [ref=e69]: "Step 5: 0"
        - button "+5" [ref=e70]
        - button "-5" [ref=e71]
```

# Test source

```ts
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
> 137 |         await expect(failingCards).toHaveCount(1);
      |                                    ^ Error: expect(locator).toHaveCount(expected) failed
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
```