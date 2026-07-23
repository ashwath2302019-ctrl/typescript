import { test, expect } from '@playwright/test'

test.describe('Playwright Self-Learning Tasks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  /*
  page.fill() places the complete value into an input directly. It is
  normally faster and is preferred when we only need to enter a value.

  Typing methods enter text one character at a time and trigger keyboard
  events for every character. They are useful when the application has
  special behaviour connected to key presses, suggestions or live search.

  In modern Playwright, locator.fill() is preferred for normal form input.
  locator.pressSequentially() is preferred when characters must be entered
  one by one. Older page.type() and locator.type() patterns are discouraged.
  */
  test('demonstrates filling and sequential typing', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Name')

    await nameInput.fill('Vikram')

    await expect(nameInput).toHaveValue('Vikram')

    await nameInput.clear()

    await nameInput.pressSequentially('Rahul', {
      delay: 100,
    })

    await expect(nameInput).toHaveValue('Rahul')
  })

  /*
  page.keyboard.press() sends a keyboard key to the element that currently
  has focus. Pressing Tab behaves like a real user pressing the Tab key and
  moves focus to the next focusable element on the page.
  */
  test('moves focus from name input to score input using Tab', async ({
    page,
  }) => {
    const nameInput = page.getByPlaceholder('Name')
    const scoreInput = page.getByPlaceholder('Score')

    await nameInput.click()
    await nameInput.fill('Vikram')

    await page.keyboard.press('Tab')

    await expect(scoreInput).toBeFocused()
  })

  /*
  page.screenshot() captures the current browser page and saves it as an
  image. Providing a path creates the screenshot at a known location.

  This is useful during debugging when we need to see exactly how the page
  looked at a particular point in the test. The screenshot below is saved
  inside the screenshots folder.
  */
  test('takes a screenshot after filling the intern form', async ({
    page,
  }) => {
    await page.getByPlaceholder('Name').fill('Vikram')

    await page.getByPlaceholder('Score').clear()
    await page.getByPlaceholder('Score').fill('88')

    await page.screenshot({
      path: 'screenshots/intern-form-filled.png',
      fullPage: true,
    })

    await expect(
      page.getByPlaceholder('Name')
    ).toHaveValue('Vikram')
  })

  /*
  test.only() tells Playwright to run only the selected test or describe
  block. All other tests are ignored during that test run. It is useful
  when debugging one failing test, but it must be removed before committing
  because it prevents the complete suite from running.

  Example:

  test.only('runs only this test', async ({ page }) => {
    await page.goto('/')
  })

  test.skip() marks a test as skipped. Playwright reports it as skipped
  without running its test body. It can be used temporarily when a feature
  is unfinished, broken or unavailable in a particular browser.

  Example:

  test.skip('temporarily skipped test', async ({ page }) => {
    await page.goto('/')
  })

  When test.only() is present, Playwright runs only tests marked with
  test.only(). Tests that are not marked with only are not executed.
  */

  test.skip('example of a temporarily skipped test', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toBeVisible()
  })
})