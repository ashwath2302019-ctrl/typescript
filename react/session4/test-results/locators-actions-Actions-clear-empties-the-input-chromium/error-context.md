# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locators-actions.spec.ts >> Actions >> clear empties the input
- Location: tests\locators-actions.spec.ts:494:3

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByRole('spinbutton', { name: 'Score', exact: true })
Expected: ""
Received: "0"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for getByRole('spinbutton', { name: 'Score', exact: true })
    14 × locator resolved to <input value="0" id="score" name="score" type="number" placeholder="Score"/>
       - unexpected value "0"

```

```yaml
- spinbutton "Score": "0"
```

# Test source

```ts
  405 |       const presentCheckbox =
  406 |         page.getByRole('checkbox', {
  407 |           name: 'Present',
  408 |           exact: true,
  409 |         });
  410 | 
  411 |       await presentCheckbox.uncheck();
  412 | 
  413 |       await expect(
  414 |         presentCheckbox,
  415 |       ).not.toBeChecked();
  416 |     },
  417 |   );
  418 | 
  419 |   test(
  420 |     'check re-applies the checked state',
  421 |     async ({ page }) => {
  422 |       const presentCheckbox =
  423 |         page.getByRole('checkbox', {
  424 |           name: 'Present',
  425 |           exact: true,
  426 |         });
  427 | 
  428 |       await presentCheckbox.uncheck();
  429 |       await presentCheckbox.check();
  430 | 
  431 |       await expect(
  432 |         presentCheckbox,
  433 |       ).toBeChecked();
  434 |     },
  435 |   );
  436 | 
  437 |   // Task 3.2 Comment:
  438 |   // check() only checks the checkbox when it is not already checked.
  439 |   // click() always toggles the state, so clicking an already checked
  440 |   // checkbox would accidentally uncheck it.
  441 | 
  442 |   test(
  443 |     'Tab moves focus from name input to score input',
  444 |     async ({ page }) => {
  445 |       const internNameInput =
  446 |         nameInput(page);
  447 | 
  448 |       const internScoreInput =
  449 |         scoreInput(page);
  450 | 
  451 |       await internNameInput.focus();
  452 | 
  453 |       await expect(
  454 |         internNameInput,
  455 |       ).toBeFocused();
  456 | 
  457 |       await page.keyboard.press('Tab');
  458 | 
  459 |       await expect(
  460 |         internScoreInput,
  461 |       ).toBeFocused();
  462 |     },
  463 |   );
  464 | 
  465 |   test(
  466 |     'Enter inside name input submits the form',
  467 |     async ({ page }) => {
  468 |       await nameInput(page).fill('Vikram');
  469 |       await scoreInput(page).fill('88');
  470 | 
  471 |       await nameInput(page).press('Enter');
  472 | 
  473 |       await expect(
  474 |         page.getByRole('heading', {
  475 |           name: 'Vikram',
  476 |           exact: true,
  477 |         }),
  478 |       ).toBeVisible();
  479 | 
  480 |       await expect(
  481 |         page.getByRole('button', {
  482 |           name: 'Remove',
  483 |           exact: true,
  484 |         }),
  485 |       ).toHaveCount(5);
  486 |     },
  487 |   );
  488 | 
  489 |   // Task 3.3 Comment:
  490 |   // locator.press('Tab') sends the key while focusing that particular locator.
  491 |   // page.keyboard.press('Tab') sends the key to whichever element currently
  492 |   // has focus on the page.
  493 | 
  494 |   test(
  495 |     'clear empties the input',
  496 |     async ({ page }) => {
  497 |       const internScoreInput =
  498 |         scoreInput(page);
  499 | 
  500 |       await internScoreInput.fill('92');
  501 |       await internScoreInput.clear();
  502 | 
  503 |       await expect(
  504 |         internScoreInput,
> 505 |       ).toHaveValue('');
      |         ^ Error: expect(locator).toHaveValue(expected) failed
  506 |     },
  507 |   );
  508 | 
  509 |   test(
  510 |     'type fires individual key events',
  511 |     async ({ page }) => {
  512 |       const internSearchInput =
  513 |         searchInput(page);
  514 | 
  515 |       await internSearchInput.pressSequentially(
  516 |         'Rah',
  517 |       );
  518 | 
  519 |       await expect(
  520 |         page.getByRole('heading', {
  521 |           name: 'Rahul',
  522 |           exact: true,
  523 |         }),
  524 |       ).toBeVisible();
  525 | 
  526 |       await expect(
  527 |         page.getByRole('button', {
  528 |           name: 'Remove',
  529 |           exact: true,
  530 |         }),
  531 |       ).toHaveCount(1);
  532 |     },
  533 |   );
  534 | 
  535 |   // Task 3.4 Comment:
  536 |   // pressSequentially() sends individual key events for every character.
  537 |   // It is useful when a live search responds after each keyboard input.
  538 |   // fill() sets the complete value directly and is normally faster.
  539 | });
```