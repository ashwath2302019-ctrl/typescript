// React.StrictMode is usually used in main.tsx by wrapping <App />.
// It runs extra development-only checks, like re-rendering components/effects,
// to help find bugs, missing cleanup, and deprecated code early.
// It does not affect the production build.

// Controlled component: React state controls the input value using value + onChange.
// Uncontrolled component: the DOM manages the input value, usually accessed with ref.
// Controlled is better when we need validation, live updates, or form state in React.

// The key prop gives each list item a stable identity so React can correctly update,
// add, remove, or reorder items. Using index as key is bad when the list changes,
// because React may confuse items and preserve the wrong state.
// Use a unique stable id from the data instead, like user.id or task.id.

// Fragment <>...</> lets us group multiple JSX elements without adding an extra div.
// Short fragment syntax cannot receive a key prop.
// If a Fragment needs a key, use: <React.Fragment key={id}>...</React.Fragment>
// This is useful when returning multiple elements from a map().