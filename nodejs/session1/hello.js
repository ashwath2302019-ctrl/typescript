const message = "Hello from Node.js"
console.log(message)

const fruits = ["apple", "banana", "mango"]
const upper = fruits.map(f => f.toUpperCase())
console.log(upper)

//  node
// Welcome to Node.js v24.16.0.
// Type ".help" for more information.
// > 10*5
// 50
// > "hello".toUpperCase()
// 'HELLO'
// > typeof "hello"
// 'string'
// > typeof 50
// 'number'
// > [1, 2, 3].filter(n => n > 1)
// [ 2, 3 ]
// > .exit

//REPL - Read -Evaluate - print - Loop

// **Write a comment** in the file explaining the difference between running JavaScript in a browser vs 
// running it with Node.js.

//javascript in a browser handles the interactive part and it is considered to be a language that handles 
//multiple functions and objects whereas nodejs is not a language it is used for running the js files.

// Node.js can do things that browser JavaScript cannot:

// 1. Read, write, create, and delete files using the File System (fs) module.
// 2. Create and run web servers using the HTTP module.