import { test, expect } from '@playwright/test';

test.describe('Assertions — State', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Add Intern button is enabled after entering a valid name', async ({
    page,
  }) => {
    await page.getByPlaceholder('Name').fill('Vikram');

    await expect(
      page.getByRole('button', { name: 'Add Intern' }),
    ).toBeEnabled();
  });

  test('name input is editable', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Name'),
    ).toBeEditable();
  });

  test('Present checkbox is checked by default', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Present' }),
    ).toBeChecked();
  });

  test('name input receives focus when clicked', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Name');

    await nameInput.click();

    await expect(nameInput).toBeFocused();
  });
});

// Task 4.1 Comment:
// toBeVisible() only checks whether the button appears on the page.
// toBeEnabled() checks whether the user can interact with the button.
// It catches cases where the button is visible but currently disabled.

test.describe('Assertions — Attributes and Classes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Present checkbox has type attribute of checkbox', async ({
    page,
  }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Present' }),
    ).toHaveAttribute('type', 'checkbox');
  });

  test('dark theme style is applied after theme toggle', async ({
    page,
  }) => {
    const navbar = page.locator('nav').first();

    await page
      .getByRole('button', {
        name: /switch to dark mode/i,
      })
      .first()
      .click();

    await expect(navbar).toHaveCSS(
      'background-color',
      'rgb(26, 26, 26)',
    );

    await expect(
      page
        .getByRole('button', {
          name: /switch to light mode/i,
        })
        .first(),
    ).toBeVisible();
  });

  test('light theme style returns after toggling back', async ({
    page,
  }) => {
    const navbar = page.locator('nav').first();

    await page
      .getByRole('button', {
        name: /switch to dark mode/i,
      })
      .first()
      .click();

    await page
      .getByRole('button', {
        name: /switch to light mode/i,
      })
      .first()
      .click();

    await expect(navbar).toHaveCSS(
      'background-color',
      'rgb(245, 245, 245)',
    );

    await expect(
      page
        .getByRole('button', {
          name: /switch to dark mode/i,
        })
        .first(),
    ).toBeVisible();
  });
});

// Task 4.2 Comment:
// This application applies the theme using inline styles instead of adding
// a dark class to the body. Therefore, toHaveCSS() checks the navbar's actual
// background colour after the theme is changed.

test.describe('Assertions — Page Level', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Intern Dashboard/);
  });

  test('page URL is the root path', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('intern dashboard matches the screenshot baseline', async ({
    page,
  }) => {
    await expect(page).toHaveScreenshot('intern-dashboard.png', {
      fullPage: true,
    });
  });
});

// Task 4.3 Comment:
// On the first run, toHaveScreenshot() creates a baseline screenshot.
// On later runs, Playwright compares the current page with that baseline.
// If the visible text or layout changes, the test fails and produces
// expected, actual and difference images.