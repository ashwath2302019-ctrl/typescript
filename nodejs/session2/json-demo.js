const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'data.json')

const raw   = fs.readFileSync(filePath, 'utf8')
const users = JSON.parse(raw)

console.log('All users:', users)
console.log('Total:', users.length)

const top = users.filter(u => u.score >= 90)
console.log('Top scorers:', top.map(u => u.name))

const avg = users.reduce((sum, u) => sum + u.score, 0 ) / users.length
console.log('Average score:', avg.toFixed(1))

// All users: [
//   { id: 1, name: 'Rahul', role: 'intern', score: 85 },
//   { id: 2, name: 'Priya', role: 'intern', score: 92 },
//   { id: 3, name: 'Amit', role: 'intern', score: 78 },
//   { id: 4, name: 'Sneha', role: 'intern', score: 95 }
// ]
// Total: 4
// Top scorers: [ 'Priya', 'Sneha' ]
// Average score: 87.5

// JSON.parse() converts a JSON string into a JavaScript object or array.
// // Without JSON.parse(), the data read from the file remains a plain string,

const newUser = { id: 5, name: 'Vikram', role: 'intern', score: 88 }
users.push(newUser)

// Write back to file
const updated = JSON.stringify(users, null, 2)
fs.writeFileSync(filePath, updated)
console.log('User added and file updated')

// Verify
const verify = JSON.parse(fs.readFileSync(filePath, 'utf8'))
console.log('Total after update:', verify.length)
//  

// JSON.stringify(users, null, 2) converts the JavaScript array into a JSON string.
// The 'null' argument means all object properties are included.
// The '2' adds indentation of 2 spaces, making the JSON file easier to read.
// Without 'null, 2', the JSON would still be correct, but it would appear as a single long line without proper formatting.

const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const index = currentData.findIndex(u => u.name === 'Amit')
if (index !== -1) {
  currentData[index].score = 90
  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2))
  console.log('Amit score updated to 90')
}
// Amit score updated to 90

//  **Explore:** What is the difference between `Array.find()` 
//  and `Array.findIndex()`? When would you need `findIndex()` over `find()`? Write your answer as a comment.

//Array.find() - return the actual object that matches the condition
//Array.findIndex() - works by accessing the index element of an array or an object . Helpful in updating and 
// deleting the contents for an individual data.It returns the position of the objet.