const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

// Write
fs.writeFileSync(filePath, 'Line 1 — written by Node.js')
console.log('File written')

// Read
const content = fs.readFileSync(filePath, 'utf8')
console.log('Content:', content)

// Append
fs.appendFileSync(filePath, '\nLine 2 — appended')
fs.appendFileSync(filePath, '\nLine 3 — appended again')

// Read again
const updated = fs.readFileSync(filePath, 'utf8')
console.log('Updated:\n', updated)

// **Write a comment** explaining the difference between `writeFileSync` and `appendFileSync`.
//writeFileSync - this function is used for writing your data onto the file , if the file already exist
//conatining some information then it overwrites.
//appendfilesync - this function is used for adding the data at the end of exisiting files .It doesn't overwrite
// or write the data initially.