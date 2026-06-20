"use strict";
console.log("Typescript is running");
const n = "ash";
//Why would you use `tsc --noEmit` instead of just `tsc`?
//tsc --noEmit is used only for type checking. It checks for TypeScript errors but does not generate 
// JavaScript files. After confirming there are no errors, I can use tsc to compile the code and run it.
function add(a, b) {
    return a + b;
}
console.log(add(5, 3));
