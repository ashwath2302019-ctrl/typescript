const fs = require('fs')

const raw = fs.readFileSync('data.json', 'utf8')
const data = JSON.parse(raw)

console.log("All users:", data.users)
console.log("First user:", data.users[0].name)

const interns = data.users.filter(u => u.role === 'intern')
console.log("Interns:", interns.map(u => u.name))

// All users: [
//   { id: 1, name: 'Rahul', role: 'intern' },
//   { id: 2, name: 'Priya', role: 'intern' },
//   { id: 3, name: 'Amit', role: 'intern' }
// ]
// First user: Rahul
// Interns: [ 'Rahul', 'Priya', 'Amit' ]

//  What does `JSON.parse()` do? What would happen if the JSON file had a syntax error — a missing comma
//   or an unclosed bracket? Try it and observe the error message. Write a comment explaining what you found.

//Json.parse coverts the given text file into a real javascript object . The text file conversin is handles by 
//json and parse converts into object so that we can able to access the data inside it.