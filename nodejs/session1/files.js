const fs = require('fs');

// Write a file
fs.writeFileSync('output.txt', 'Hello from Node.js file system!');

// Read it back
const content = fs.readFileSync('output.txt', 'utf8');
console.log("File content:", content);

// Append to it
fs.appendFileSync('output.txt', '\nThis line was appended.');

// Read again
const updated = fs.readFileSync('output.txt', 'utf8');
console.log("Updated content:", updated);   

// writeFileSync() : Mainly used for writing the data over a file .If doesn't exist : it creates and write data
// if it exist : It overwrites the existing data.

// appendFileSync() keeps the existing content and adds new content to
// the end of the file without deleting anything.