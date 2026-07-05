const path = require('path')

console.log("Directory name:", __dirname)
console.log("File name:", __filename)

const joined = path.join(__dirname, 'data', 'users.json')
console.log("Joined path:", joined)

console.log("Extension:", path.extname('index.html'))
console.log("Basename:", path.basename('/users/rahul/notes.txt'))
console.log("Dirname:", path.dirname('/users/rahul/notes.txt'))

// PS C:\Users\Ashwath\Desktop\Typescript\typescript\nodejs\session1> node paths.js
// Directory name: C:\Users\Ashwath\Desktop\Typescript\typescript\nodejs\session1
// File name: C:\Users\Ashwath\Desktop\Typescript\typescript\nodejs\session1\paths.js
// Joined path: C:\Users\Ashwath\Desktop\Typescript\typescript\nodejs\session1\data\users.json
// Extension: .html
// Basename: notes.txt
// Dirname: /users/rahul

// **Write a comment** explaining why `path.join()` 
// is preferred over manually concatenating strings like `__dirname + '/data/users.json'`.

//Path.join supports for every operating system which allows us to connect files to directory easily but 
//but manual methods like appending doesn't support for multiple os  for eg(/ supports for linux and \ for windows)