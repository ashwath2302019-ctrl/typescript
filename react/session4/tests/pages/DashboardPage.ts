import {
  type Locator,
  type Page,
} from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly scoreInput: Locator;
  readonly roleSelect: Locator;
  readonly addButton: Locator;
  readonly resetButton: Locator;
  readonly searchInput: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.getByRole('textbox', {
      name: 'Intern Name',
      exact: true,
    });

    this.scoreInput = page.getByRole('spinbutton', {
      name: 'Score',
      exact: true,
    });

    this.roleSelect = page.getByRole('combobox', {
      name: 'Role',
      exact: true,
    });

    this.addButton = page.getByRole('button', {
      name: 'Add Intern',
      exact: true,
    });

    this.resetButton = page.getByRole('button', {
      name: 'Reset',
      exact: true,
    });

    this.searchInput = page.getByRole('textbox', {
      name: 'Search by name or role',
      exact: true,
    });

    this.themeToggle = page
      .getByRole('button', {
        name: /switch to/i,
      })
      .first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');

    await this.page
      .getByRole('button', {
        name: 'Remove',
        exact: true,
      })
      .first()
      .waitFor();
  }

  async addIntern(
    name: string,
    score: string,
    role = 'Frontend',
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.scoreInput.fill(score);
    await this.roleSelect.selectOption(role);
    await this.addButton.click();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

  async toggleTheme(): Promise<void> {
    await this.themeToggle.click();
  }

  internCard(name: string): Locator {
    return this.page
      .getByRole('heading', {
        name,
        exact: true,
      })
      .locator('..');
  }

  removeButtonFor(name: string): Locator {
    return this.internCard(name).getByRole('button', {
      name: 'Remove',
      exact: true,
    });
  }

  get internCount(): Locator {
    return this.page.getByRole('button', {
      name: 'Remove',
      exact: true,
    });
  }

  validationError(): Locator {
    return this.page.getByRole('alert');
  }
}