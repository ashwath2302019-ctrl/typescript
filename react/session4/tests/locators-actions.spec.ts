import {
  test,
  expect,
  type Page,
} from '@playwright/test';

async function waitForInterns(
  page: Page,
): Promise<void> {
  await expect(
    page.getByRole('button', {
      name: 'Remove',
      exact: true,
    }),
  ).toHaveCount(4);
}

function internList(page: Page) {
  return page.getByTestId('intern-list');
}

function internCards(page: Page) {
  return internList(page).locator(':scope > div');
}

function internCard(
  page: Page,
  name: string,
) {
  return internCards(page).filter({
    has: page.getByRole('heading', {
      name,
      exact: true,
    }),
  });
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

test.describe(
  'Locator Chaining and Filtering',
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await waitForInterns(page);
    });

    test(
      "finds Rahul's Remove button using filter",
      async ({ page }) => {
        const rahulCard = internCard(
          page,
          'Rahul',
        );

        const removeButton =
          rahulCard.getByRole('button', {
            name: 'Remove',
            exact: true,
          });

        await expect(removeButton).toBeVisible();
      },
    );

    test(
      "finds Priya's score using filter and chaining",
      async ({ page }) => {
        const priyaCard = internCard(
          page,
          'Priya',
        );

        await expect(priyaCard).toBeVisible();

        await expect(
          priyaCard.getByText('Score: 78', {
            exact: true,
          }),
        ).toBeVisible();
      },
    );

    // Task 1.1 Comment:
    // filter({ hasText: 'Priya' }) is safer than nth(1) because it finds
    // Priya using her name. If the card order changes, it still finds her card.

    test(
      'counts only the cards that show Pass status',
      async ({ page }) => {
        const passingCards =
          internCards(page).filter({
            has: page.getByText(
              'Status: Pass',
              {
                exact: true,
              },
            ),
          });

        await expect(passingCards).toHaveCount(3);
      },
    );

    test(
      'counts only the cards that show Fail status',
      async ({ page }) => {
        const failingCards =
          internCards(page).filter({
            has: page.getByText(
              'Status: Fail',
              {
                exact: true,
              },
            ),
          });

        await expect(failingCards).toHaveCount(1);
      },
    );

    // Task 1.2 Comment:
    // hasText checks whether the card contains the given text anywhere.
    // has checks whether the card contains an element matching another locator,
    // so it is more specific when searching for a nested element.

    test(
      'first Remove button belongs to the first intern',
      async ({ page }) => {
        const firstRemove = page
          .getByRole('button', {
            name: 'Remove',
            exact: true,
          })
          .first();

        await expect(firstRemove).toBeVisible();
      },
    );

    test(
      'last Remove button belongs to the last intern',
      async ({ page }) => {
        const lastRemove = page
          .getByRole('button', {
            name: 'Remove',
            exact: true,
          })
          .last();

        await expect(lastRemove).toBeVisible();
      },
    );

    test(
      'second card is accessible by index',
      async ({ page }) => {
        const secondCard =
          internCards(page).nth(1);

        await expect(secondCard).toBeVisible();

        await expect(
          secondCard.getByRole('heading', {
            name: 'Priya',
            exact: true,
          }),
        ).toBeVisible();
      },
    );

    test(
      'removes the first intern using first',
      async ({ page }) => {
        const removeButtons =
          page.getByRole('button', {
            name: 'Remove',
            exact: true,
          });

        await removeButtons.first().click();

        await expect(removeButtons).toHaveCount(3);
      },
    );

    // Task 1.3 Comment:
    // first(), last() and nth() depend on the current element order.
    // If the list order changes, they may select a different intern.
    // Filtering with a unique name is safer when targeting a specific person.
  },
);

test.describe('Scoped Locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForInterns(page);
  });

  test(
    "asserts score and status inside Rahul's card only",
    async ({ page }) => {
      const rahulCard = internCard(
        page,
        'Rahul',
      );

      await expect(
        rahulCard.getByText('Score: 92', {
          exact: true,
        }),
      ).toBeVisible();

      await expect(
        rahulCard.getByText('Status: Pass', {
          exact: true,
        }),
      ).toBeVisible();

      await expect(
        rahulCard.getByRole('button', {
          name: 'Remove',
          exact: true,
        }),
      ).toBeVisible();
    },
  );

  test(
    'asserts different data in two different cards',
    async ({ page }) => {
      const rahulCard = internCard(
        page,
        'Rahul',
      );

      const amitCard = internCard(
        page,
        'Amit',
      );

      await expect(
        rahulCard.getByText('Status: Pass', {
          exact: true,
        }),
      ).toBeVisible();

      await expect(
        amitCard.getByText('Status: Fail', {
          exact: true,
        }),
      ).toBeVisible();
    },
  );

  // Task 2.1 Comment:
  // Scoped locators prevent Playwright from matching repeated elements
  // from the wrong card. They make sure the score, status and button
  // being tested all belong to the intended intern.

  test(
    'fills the form using scoped locators on the form container',
    async ({ page }) => {
      const form = page.getByRole('form', {
        name: 'Add Intern',
        exact: true,
      });

      await form
        .getByRole('textbox', {
          name: 'Intern Name',
          exact: true,
        })
        .fill('Vikram');

      await form
        .getByRole('spinbutton', {
          name: 'Score',
          exact: true,
        })
        .fill('75');

      await form
        .getByRole('button', {
          name: 'Add Intern',
          exact: true,
        })
        .click();

      await expect(
        page.getByRole('heading', {
          name: 'Vikram',
          exact: true,
        }),
      ).toBeVisible();
    },
  );

  // Task 2.2 Comment:
  // Scoping prevents a test from filling a similar input in another form.
  // It also prevents clicking the wrong button when different sections
  // contain buttons with the same accessible name.
});

test.describe('Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForInterns(page);
  });

  test(
    'fill sets the input value directly',
    async ({ page }) => {
      const internNameInput =
        nameInput(page);

      await internNameInput.fill('Vikram');

      await expect(
        internNameInput,
      ).toHaveValue('Vikram');
    },
  );

  test(
    'selectOption selects by visible label text',
    async ({ page }) => {
      const roleSelect =
        page.getByRole('combobox', {
          name: 'Role',
          exact: true,
        });

      await roleSelect.selectOption({
        label: 'Backend',
      });

      await expect(
        roleSelect,
      ).toHaveValue('Backend');
    },
  );

  test(
    'selectOption selects by value attribute',
    async ({ page }) => {
      const roleSelect =
        page.getByRole('combobox', {
          name: 'Role',
          exact: true,
        });

      await roleSelect.selectOption(
        'Frontend',
      );

      await expect(
        roleSelect,
      ).toHaveValue('Frontend');
    },
  );

  // Task 3.1 Comment:
  // selectOption('Backend') selects an option using its value attribute.
  // selectOption({ label: 'Backend' }) selects it using the visible text.
  // The label can be more readable, while the value is safer if text changes.

  test(
    'checkbox is checked by default',
    async ({ page }) => {
      const presentCheckbox =
        page.getByRole('checkbox', {
          name: 'Present',
          exact: true,
        });

      await expect(
        presentCheckbox,
      ).toBeChecked();
    },
  );

  test(
    'uncheck removes the checked state',
    async ({ page }) => {
      const presentCheckbox =
        page.getByRole('checkbox', {
          name: 'Present',
          exact: true,
        });

      await presentCheckbox.uncheck();

      await expect(
        presentCheckbox,
      ).not.toBeChecked();
    },
  );

  test(
    'check re-applies the checked state',
    async ({ page }) => {
      const presentCheckbox =
        page.getByRole('checkbox', {
          name: 'Present',
          exact: true,
        });

      await presentCheckbox.uncheck();
      await presentCheckbox.check();

      await expect(
        presentCheckbox,
      ).toBeChecked();
    },
  );

  // Task 3.2 Comment:
  // check() only checks the checkbox when it is not already checked.
  // click() always toggles the state, so clicking an already checked
  // checkbox would accidentally uncheck it.

  test(
    'Tab moves focus from name input to score input',
    async ({ page }) => {
      const internNameInput =
        nameInput(page);

      const internScoreInput =
        scoreInput(page);

      await internNameInput.focus();

      await expect(
        internNameInput,
      ).toBeFocused();

      await page.keyboard.press('Tab');

      await expect(
        internScoreInput,
      ).toBeFocused();
    },
  );

  test(
    'Enter inside name input submits the form',
    async ({ page }) => {
      await nameInput(page).fill('Vikram');
      await scoreInput(page).fill('88');

      await nameInput(page).press('Enter');

      await expect(
        page.getByRole('heading', {
          name: 'Vikram',
          exact: true,
        }),
      ).toBeVisible();

      await expect(
        page.getByRole('button', {
          name: 'Remove',
          exact: true,
        }),
      ).toHaveCount(5);
    },
  );

  // Task 3.3 Comment:
  // locator.press('Tab') sends the key while focusing that particular locator.
  // page.keyboard.press('Tab') sends the key to whichever element currently
  // has focus on the page.

  test(
    'clear empties the input',
    async ({ page }) => {
      const internScoreInput =
        scoreInput(page);

      await internScoreInput.fill('92');
      await internScoreInput.clear();

      await expect(
        internScoreInput,
      ).toHaveValue('');
    },
  );

  test(
    'type fires individual key events',
    async ({ page }) => {
      const internSearchInput =
        searchInput(page);

      await internSearchInput.pressSequentially(
        'Rah',
      );

      await expect(
        page.getByRole('heading', {
          name: 'Rahul',
          exact: true,
        }),
      ).toBeVisible();

      await expect(
        page.getByRole('button', {
          name: 'Remove',
          exact: true,
        }),
      ).toHaveCount(1);
    },
  );

  // Task 3.4 Comment:
  // pressSequentially() sends individual key events for every character.
  // It is useful when a live search responds after each keyboard input.
  // fill() sets the complete value directly and is normally faster.
});