// page.pause() helps when I want to see the actual page before a test fails,
// such as checking whether the form is filled correctly or whether a button is visible.
// It is also useful for recording better locators in Playwright Inspector instead of guessing them.

// The Inspector showed each test step, the current page state, and whether the locator matched any element.
// This made it much easier to understand why the test failed than reading only the terminal error message.

// The DOM Snapshot pane was the most useful because it showed the exact elements present
// when the assertion failed, making it easy to compare the expected and actual page state.

// timeout controls the maximum time allowed for the entire test to finish.
// expect.timeout controls how long Playwright waits for a single assertion,
// such as waiting for an element to become visible before failing.

// A device preset like devices['Pixel 5'] automatically sets the viewport size,
// user agent, and device scale factor so the browser behaves like a real mobile device.

// test.skip(browserName !== 'chromium', ...) is useful when testing a feature
// that is only supported in Chromium, such as the File System Access API,
// which is not fully available in Firefox or WebKit.