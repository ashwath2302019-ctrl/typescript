import { test, expect, type Page } from '@playwright/test';

async function waitForInterns(page: Page): Promise<void> {
  await expect(
    page.getByRole('button', {
      name: 'Remove',
      exact: true,
    }),
  ).toHaveCount(4);
}

function nameInput(page: Page) {
  return page.getByRole('textbox', {
    name: 'Intern Name',
    exact: true,
  });
}

function scoreInput(page: Page) {
  return page.getByRole('spinbutton', {
    name: 'Score',
    exact: true,
  });
}

function searchInput(page: Page) {
  return page.getByRole('textbox', {
    name: 'Search by name or role',
    exact: true,
  });
}

function addInternButton(page: Page) {
  return page.getByRole('button', {
    name: 'Add Intern',
    exact: true,
  });
}

function removeButtons(page: Page) {
  return page.getByRole('button', {
    name: 'Remove',
    exact: true,
  });
}

function internHeading(page: Page, name: string) {
  return page.getByRole('heading', {
    name,
    exact: true,
  });
}

function internCard(page: Page, name: string) {
  return internHeading(page, name).locator('..');
}

test.describe('User Journey — Add Intern', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForInterns(page);
  });

  test(
    'user fills the form and the new intern appears in the list',
    async ({ page }) => {
      await nameInput(page).fill('Vikram');
      await scoreInput(page).fill('88');

      await page
        .getByRole('combobox', {
          name: 'Role',
          exact: true,
        })
        .selectOption('Frontend');

      await addInternButton(page).click();

      await expect(
        internHeading(page, 'Vikram'),
      ).toBeVisible();

      await expect(removeButtons(page)).toHaveCount(5);
    },
  );

  
test(
  'new intern shows Pass badge when score is 88',
  async ({ page }) => {
    await nameInput(page).fill('Vikram');
    await scoreInput(page).fill('88');

    await addInternButton(page).click();

    const vikramCard = internCard(page, 'Vikram');

    await expect(
      vikramCard.getByText('Status: Pass', {
        exact: true,
      }),
    ).toBeVisible();
  },
);

test(
  'new intern shows Fail badge when score is 45',
  async ({ page }) => {
    await nameInput(page).fill('Ravi');
    await scoreInput(page).fill('45');

    await addInternButton(page).click();

    const raviCard = internCard(page, 'Ravi');

    await expect(
      raviCard.getByText('Status: Fail', {
        exact: true,
      }),
    ).toBeVisible();
  },
);
 

  test(
    'form resets to empty after successful submission',
    async ({ page }) => {
      const internNameInput = nameInput(page);
      const internScoreInput = scoreInput(page);

      await internNameInput.fill('Vikram');
      await internScoreInput.fill('88');

      await addInternButton(page).click();

      await expect(internNameInput).toHaveValue('');
      await expect(internScoreInput).toHaveValue('0');
    },
  );
});

test.describe('User Journey — Add Intern Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForInterns(page);
  });

  test(
    'shows error when submitting with empty name',
    async ({ page }) => {
      await addInternButton(page).click();

      await expect(
        page.getByRole('alert'),
      ).toHaveText('Name is required');
    },
  );

  test(
    'does not add intern when name is empty',
    async ({ page }) => {
      await addInternButton(page).click();

      await expect(removeButtons(page)).toHaveCount(4);
    },
  );

  test(
    'error clears after entering a valid name and resubmitting',
    async ({ page }) => {
      await addInternButton(page).click();

      await expect(
        page.getByRole('alert'),
      ).toHaveText('Name is required');

      await nameInput(page).fill('Vikram');
      await scoreInput(page).fill('88');

      await addInternButton(page).click();

      await expect(
        page.getByRole('alert'),
      ).toHaveCount(0);

      await expect(
        internHeading(page, 'Vikram'),
      ).toBeVisible();
    },
  );

  test(
    'shows error when score is above 100',
    async ({ page }) => {
      await nameInput(page).fill('Vikram');
      await scoreInput(page).fill('150');

      await addInternButton(page).click();

      await expect(
        page.getByRole('alert'),
      ).toHaveText(
        'Score must be between 0 and 100',
      );
    },
  );
});

test.describe('User Journey — Search and Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForInterns(page);
  });

  test(
    'typing in search filters the intern list',
    async ({ page }) => {
      await searchInput(page).fill('Rah');

      await expect(removeButtons(page)).toHaveCount(1);

      await expect(
        internHeading(page, 'Rahul'),
      ).toBeVisible();

      await expect(
        internHeading(page, 'Priya'),
      ).toHaveCount(0);
    },
  );

  test(
    'clearing search restores all interns',
    async ({ page }) => {
      const internSearchInput = searchInput(page);

      await internSearchInput.fill('Rahul');

      await expect(removeButtons(page)).toHaveCount(1);

      await internSearchInput.clear();

      await expect(removeButtons(page)).toHaveCount(4);
    },
  );

  test(
    'search is case-insensitive',
    async ({ page }) => {
      await searchInput(page).fill('rahul');

      await expect(
        internHeading(page, 'Rahul'),
      ).toBeVisible();

      await expect(removeButtons(page)).toHaveCount(1);
    },
  );

  test(
    'search filters interns by role',
    async ({ page }) => {
      await searchInput(page).fill('Backend');

      await expect(removeButtons(page)).toHaveCount(1);

      await expect(
        internHeading(page, 'Priya'),
      ).toBeVisible();
    },
  );

  test(
    'no match shows empty state message',
    async ({ page }) => {
      await searchInput(page).fill('zzz');

      await expect(removeButtons(page)).toHaveCount(0);

      await expect(
        page.getByText('No interns found', {
          exact: true,
        }),
      ).toBeVisible();
    },
  );
});

test.describe('User Journey — Remove Intern', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForInterns(page);
  });

  test(
    "clicking Remove on Rahul's card removes Rahul from the list",
    async ({ page }) => {
      const rahulCard = internCard(page, 'Rahul');

      await expect(rahulCard).toBeVisible();

      await rahulCard
        .getByRole('button', {
          name: 'Remove',
          exact: true,
        })
        .click();

      await expect(
        internHeading(page, 'Rahul'),
      ).toHaveCount(0);

      await expect(removeButtons(page)).toHaveCount(3);
    },
  );

  test(
    'intern count decreases after removal',
    async ({ page }) => {
      await internCard(page, 'Rahul')
        .getByRole('button', {
          name: 'Remove',
          exact: true,
        })
        .click();

      await expect(removeButtons(page)).toHaveCount(3);
    },
  );

  test(
    'other interns remain after one is removed',
    async ({ page }) => {
      await internCard(page, 'Rahul')
        .getByRole('button', {
          name: 'Remove',
          exact: true,
        })
        .click();

      await expect(
        internHeading(page, 'Priya'),
      ).toBeVisible();

      await expect(
        internHeading(page, 'Amit'),
      ).toBeVisible();

      await expect(
        internHeading(page, 'Sneha'),
      ).toBeVisible();
    },
  );

  test(
    'removed intern does not reappear after page interaction',
    async ({ page }) => {
      await internCard(page, 'Rahul')
        .getByRole('button', {
          name: 'Remove',
          exact: true,
        })
        .click();

      await page
        .getByRole('button', {
          name: /switch to dark mode/i,
        })
        .first()
        .click();

      await expect(
        internHeading(page, 'Rahul'),
      ).toHaveCount(0);

      await expect(removeButtons(page)).toHaveCount(3);
    },
  );
});

test.describe('User Journey — Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test(
    'toggle button shows current mode to switch to',
    async ({ page }) => {
      await expect(
        page
          .getByRole('button', {
            name: /switch to dark mode/i,
          })
          .first(),
      ).toBeVisible();
    },
  );

  test(
    'clicking toggle switches to dark mode',
    async ({ page }) => {
      await page
        .getByRole('button', {
          name: /switch to dark mode/i,
        })
        .first()
        .click();

      await expect(
        page
          .getByRole('button', {
            name: /switch to light mode/i,
          })
          .first(),
      ).toBeVisible();
    },
  );

  test(
    'clicking toggle again switches back to light mode',
    async ({ page }) => {
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

      await expect(
        page
          .getByRole('button', {
            name: /switch to dark mode/i,
          })
          .first(),
      ).toBeVisible();
    },
  );
});

// Full user journeys test how multiple parts of the application work
// together from the user's point of view. They check complete actions such
// as filling a form, submitting it and confirming the result on the page.
//
// These tests are useful because they can find integration problems between
// components, hooks and contexts that isolated unit tests may not detect.

// Task 5.1 Comment

// The journey test checks the complete process in a real browser, including entering form values, 
// submitting the form, updating the shared state and displaying the new intern. 
// A unit test normally checks only one component or function and may not find problems between connected 
// components.

// Task 5.3 Comment

// The type() action enters characters one at a time like a real user typing on a keyboard. 
// This is more realistic for a search input because it triggers the input event after every character, 
// allowing us to test whether filtering updates while the user types.

// Task 5.4 Comment

// Scoping from Rahul’s heading to Rahul’s card ensures that Playwright clicks the Remove 
// button belonging specifically to Rahul. Using .first() could remove the wrong intern when the order of the 
// intern list changes or when another Remove button appears before Rahul’s button.

// Task 5.5 Comment

// Checking that the button changes from “Switch to Dark Mode” to “Switch to Light Mode” confirms that the 
// theme state changed successfully. Since this application uses inline styles, checking the updated button label
//  is valid. If the application added a CSS class to the body or root element, we would instead check whether the
//  dark class was added and removed.