const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

// Synchronous
console.log('1 — before sync read')
const data = fs.readFileSync(filePath, 'utf8')
console.log('2 — sync read done:', data.split('\n').length, 'lines')
console.log('3 — after sync read')

console.log('---')

// Asynchronous
console.log('4 — before async read')
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err
  console.log('6 — async read done:', data.split('\n').length, 'lines')
})
console.log('5 — after async read (does not wait)')

const checkPath = path.join(__dirname, 'missing.txt')

if (fs.existsSync(checkPath)) {
  console.log('File exists')
} else {
  console.log('File does not exist — creating it')
  fs.writeFileSync(checkPath, 'Created because it was missing')
}

// try {
//     const data = fs.readFileSync("missing.txt", "utf8");
//     console.log(data);
// } catch (err) {
//     console.log("File not found.");
// }  the error can be handles using a try and catch block.

// Synchronous file reading blocks the program until the file is completely read,
// so other requests must wait. Asynchronous file reading allows Node.js to continue
// handling other users while the file is being read, making the server faster and
// more responsive when multiple users access it at the same time.