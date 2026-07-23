import {
  test,
  expect,
} from '@playwright/test';

import {
  DashboardPage,
} from './DashboardPage';

test.describe(
  'Journeys via Page Object',
  () => {
    let dashboard: DashboardPage;

    test.beforeEach(async ({ page }) => {
      dashboard = new DashboardPage(page);
      await dashboard.goto();
    });

    test('adds a new intern', async () => {
      await dashboard.addIntern(
        'Vikram',
        '88',
        'Backend',
      );

      await expect(
        dashboard.internCard('Vikram'),
      ).toBeVisible();

      await expect(
        dashboard.internCount,
      ).toHaveCount(5);
    });

    test(
      'searches and filters the list',
      async () => {
        await dashboard.search('Rah');

        await expect(
          dashboard.internCount,
        ).toHaveCount(1);

        await expect(
          dashboard.internCard('Rahul'),
        ).toBeVisible();
      },
    );

    test(
      'clears search and restores all interns',
      async () => {
        await dashboard.search('Rahul');

        await expect(
          dashboard.internCount,
        ).toHaveCount(1);

        await dashboard.clearSearch();

        await expect(
          dashboard.internCount,
        ).toHaveCount(4);
      },
    );

    test(
      'removes an intern by name',
      async () => {
        await dashboard
          .removeButtonFor('Rahul')
          .click();

        await expect(
          dashboard.internCard('Rahul'),
        ).toHaveCount(0);

        await expect(
          dashboard.internCount,
        ).toHaveCount(3);
      },
    );

    test(
      'toggles theme and button label updates',
      async () => {
        await dashboard.toggleTheme();

        await expect(
          dashboard.themeToggle,
        ).toContainText('Light');
      },
    );

    test(
      'shows validation error on empty submit',
      async () => {
        await dashboard.addButton.click();

        await expect(
          dashboard.validationError(),
        ).toContainText(
          'Name is required',
        );
      },
    );
  },
);

// dashboard.themeToggle is located in the constructor using its button role.
// After the click, the Light text means the button now offers switching back
// to light mode, confirming that the current theme changed to dark mode.