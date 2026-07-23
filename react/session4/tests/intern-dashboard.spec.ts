import { test, expect } from '@playwright/test'

test.describe('Intern Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })


  /*
Desktop Chrome provides a predefined browser configuration that matches
Google Chrome on a desktop computer. It automatically sets a realistic
viewport size, user agent string, and device pixel ratio so tests run
under conditions similar to a real desktop browser.
*/

  test('shows the page title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toBeVisible()
  })

  test('shows the theme toggle button', async ({ page }) => {
    await expect(
      page
        .getByRole('button', { name: /switch to dark mode/i })
        .first()
    ).toBeVisible()
  })

  /*
beforeEach() runs before every test and starts each test from the same
initial state. Navigating to '/' here avoids repeating page.goto() in
every test, reduces duplicate code, and keeps the tests easier to
maintain.
*/

  test('shows the initial intern names', async ({ page }) => {
    await expect(
      page.getByText(/Rahul — \d+/, { exact: true })
    ).toBeVisible()

    await expect(
      page.getByText(/Priya — \d+/, { exact: true })
    ).toBeVisible()

    await expect(
      page.getByText(/Amit — \d+/, { exact: true })
    ).toBeVisible()

    await expect(
      page.getByText(/Sneha — \d+/, { exact: true })
    ).toBeVisible()
  })


  /*
toBeVisible() checks that an element exists and is actually visible to
the user. toBeInTheDocument() only checks that the element exists in the
DOM, even if it is hidden. Playwright uses toBeVisible() because it
tests the real browser from the user's perspective.
*/

  test('shows the correct number of intern cards', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4)
  })
})

test.describe('Locator Practice — getByRole', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  /*
getByRole() is the preferred locator because it finds elements using
their accessible role and name, just like screen readers and users do.
This makes tests more reliable and encourages accessible HTML, whereas
getByTestId() depends on custom attributes that users cannot see.

  test('finds the Add Intern button by role', async ({ page }) => {
    const addButton = page.getByRole('button', {
      name: 'Add Intern',
    })

    await expect(addButton).toBeVisible()
  })

  test('finds the heading by role', async ({ page }) => {
    const heading = page.getByRole('heading', {
      name: 'Intern Dashboard',
    })

    await expect(heading).toBeVisible()
  })

  test('finds the name input by role', async ({ page }) => {
    const nameInput = page.getByRole('textbox', {
      name: 'Intern Name',
    })

    await expect(nameInput).toBeVisible()
  })

  test('finds the name input by placeholder', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Name')

    await expect(nameInput).toBeVisible()
    await expect(nameInput).toHaveValue('')
  })

  test('finds the score input by placeholder', async ({ page }) => {
    const scoreInput = page.getByPlaceholder('Score')

    await expect(scoreInput).toBeVisible()
  })

  test('finds Rahul using visible text', async ({ page }) => {
    await expect(
      page.getByText(/Rahul — \d+/, { exact: true })
    ).toBeVisible()
  })

  test('finds an intern using regex text matching', async ({ page }) => {
    await expect(
      page.getByText(/— \d+/).first()
    ).toBeVisible()
  })

  test('asserts that missing text is not visible', async ({ page }) => {
    await expect(
      page.getByText('Unknown Intern')
    ).not.toBeVisible()
  })

  /*
  getByRole is preferred because it finds elements in the same way
  users and screen readers understand them. It encourages accessible
  HTML, while getByTestId depends on special attributes that users
  cannot see.
  */

  /*
  .first() is needed when a locator matches multiple elements.
  Playwright strict mode normally expects a locator to identify one
  element. It selects the first matching element and prevents a
  strict-mode violation.
  */
})

test.describe('Assertions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('heading has the correct text', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toHaveText('Intern Dashboard')
  })

  test('theme toggle button contains the word Dark', async ({ page }) => {
    await expect(
      page
        .getByRole('button', { name: /switch to dark mode/i })
        .first()
    ).toContainText('Dark')
  })

  test('error message is not visible initially', async ({ page }) => {
    await expect(
      page.getByText('Name is required')
    ).not.toBeVisible()
  })

  test('name input is empty initially', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Name')
    ).toHaveValue('')
  })

  test('score input is available initially', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Score')
    ).toBeVisible()
  })

  test('correct number of Remove buttons matches the intern count', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4)
  })

  /*
  toHaveText checks whether the complete text of an element matches
  the expected text. toContainText checks whether the expected words
  appear somewhere inside the complete text.
  */

  /*
  When toHaveCount(4) is changed to toHaveCount(5), Playwright waits
  for the configured assertion timeout before failing. The error
  displays the expected count, received count and locator information.
  */
})

test.describe('Add Intern Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  /*
  This E2E test checks the complete connection between the form,
  context state and intern list. A unit test can check the form
  component alone, but it cannot confirm that submitting the form
  updates the real list inside the complete browser application.
  */
  test('adds a new intern and shows them in the list', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram')

    await page.getByPlaceholder('Score').clear()
    await page.getByPlaceholder('Score').fill('88')

    await page.getByRole('button', { name: 'Add Intern' }).click()

    await expect(
      page.getByText(/Vikram — 88/, { exact: true })
    ).toBeVisible()
  })

  test('intern count increases after adding', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4)

    await page.getByPlaceholder('Name').fill('Vikram')

    await page.getByPlaceholder('Score').clear()
    await page.getByPlaceholder('Score').fill('88')

    await page.getByRole('button', { name: 'Add Intern' }).click()

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(5)
  })

  test('form clears after successful submission', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Name')
    const scoreInput = page.getByPlaceholder('Score')

    await nameInput.fill('Vikram')
    await scoreInput.clear()
    await scoreInput.fill('88')

    await page.getByRole('button', { name: 'Add Intern' }).click()

    await expect(nameInput).toHaveValue('')
  })

  test('shows validation error when name is empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click()

    await expect(
      page.getByText('Name is required')
    ).toBeVisible()
  })

  test('does not add intern when form is invalid', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click()

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4)
  })

  test('validation error disappears after valid submission', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click()

    await expect(
      page.getByText('Name is required')
    ).toBeVisible()

    await page.getByPlaceholder('Name').fill('Vikram')

    await page.getByRole('button', { name: 'Add Intern' }).click()

    await expect(
      page.getByText('Name is required')
    ).not.toBeVisible()
  })

  /*
  not.toBeVisible() is suitable because Playwright works with locators
  on a real browser page and automatically waits for the interface to
  update. Vitest and React Testing Library commonly use queryByText()
  because they directly inspect the rendered component DOM.
  */
})

test.describe('Remove Intern Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('removes an intern when Remove is clicked', async ({ page }) => {
    const rahulText = page.getByText(/Rahul — \d+/, {
      exact: true,
    })

    await expect(rahulText).toBeVisible()

    const rahulCard = rahulText.locator('..')

    await rahulCard
      .getByRole('button', { name: 'Remove' })
      .click()

    await expect(rahulText).not.toBeVisible()
  })

  test('intern count decreases after removal', async ({ page }) => {
    const removeButtons = page.getByRole('button', {
      name: 'Remove',
    })

    await expect(removeButtons).toHaveCount(4)

    await removeButtons.first().click()

    await expect(removeButtons).toHaveCount(3)
  })

  /*
  Alternative approach using locator.filter():

  const rahulCard = page
    .locator('div')
    .filter({ hasText: /Rahul — \d+/ })
    .filter({
      has: page.getByRole('button', { name: 'Remove' }),
    })
    .last()

  await rahulCard
    .getByRole('button', { name: 'Remove' })
    .click()

  filter() finds a container that contains the required text and child
  element. This avoids moving to the parent using locator('..').
  */
})

test.describe('Theme Toggle Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('toggle button label changes from Dark to Light after click', async ({
    page,
  }) => {
    const darkModeButton = page
      .getByRole('button', { name: /switch to dark mode/i })
      .first()

    await expect(darkModeButton).toBeVisible()

    await darkModeButton.click()

    await expect(
      page
        .getByRole('button', { name: /switch to light mode/i })
        .first()
    ).toBeVisible()
  })

  test('toggle switches back on second click', async ({ page }) => {
    await page
      .getByRole('button', { name: /switch to dark mode/i })
      .first()
      .click()

    await page
      .getByRole('button', { name: /switch to light mode/i })
      .first()
      .click()

    await expect(
      page
        .getByRole('button', { name: /switch to dark mode/i })
        .first()
    ).toBeVisible()
  })

  /*
  A Vitest unit test checks the Navbar component in an isolated test
  environment. Playwright verifies the Navbar inside the complete
  application in a real browser. It confirms that the visible button
  can be clicked and that its displayed label changes for the user.
  */
})

/*
In Playwright UI mode, selecting a locator highlights its matching
element directly on the webpage. This makes it easier to identify when
a locator matches multiple elements, which is harder to understand
using terminal output alone.
*/

/*
Headless mode runs tests without displaying the browser window. It is
faster and is useful for complete test runs and continuous integration.

Headed mode opens the real browser window and allows us to watch the
navigation, typing and clicking actions. It is useful when debugging
a failed test or visually checking the user journey.
*/


/*
The HTML report showed the exact step where the test failed, a screenshot
of the page at that moment, and the expected versus actual result. It also
provided the action history and error details, making it much easier to
understand the failure than the terminal output alone.
*/


/*
The Timeline pane shows every action performed during the test and helps
identify exactly where a failure occurred.

The Screenshots pane displays the page after each action and helps verify
whether the user interface looked as expected.

The Network pane lists all HTTP requests and responses, making it useful
for finding failed API calls or slow requests.

The DOM Snapshot pane shows the HTML structure at each step, helping to
inspect elements that were missing, hidden, or changed during the test.
*/