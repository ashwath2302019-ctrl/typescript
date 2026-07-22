/*
React.memo prevents a child component from re-rendering if its props
have not changed. It works well with useCallback because the function
reference stays the same, avoiding unnecessary re-renders.
*/

/*
Do not use useMemo or useCallback for simple calculations or small
functions. They add extra complexity and can sometimes be slower than
simply recalculating or recreating the function.
*/

/*
useReducer is useful when state has multiple related actions or complex
update logic. It keeps all state changes in one place and makes the code
easier to manage than using many useState calls.
*/

/*
useContext with useState is suitable for small applications. Zustand and
Redux Toolkit are better for large applications with complex shared state,
multiple pages, and easier state management.
*/