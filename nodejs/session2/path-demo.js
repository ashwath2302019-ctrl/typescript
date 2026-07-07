const path = require('path') //this loads the path package which then used for displaying the path to our files

console.log('Current directory:', __dirname) // returns the full current directory name (folder name) 
console.log('Current file:     ', __filename) // returns the file name along with the directory name

const filePath = path.join(__dirname, 'data', 'users.json') //joins the data directory to our directory
console.log('Joined path:', filePath) 

console.log('Basename:', path.basename('/home/user/notes.txt')) //return only the base file (i.e) text file name
console.log('Extension:', path.extname('index.html')) // returns only the extension of your files
console.log('Dirname:  ', path.dirname('/home/user/notes.txt')) //returns the directory to our files

const manual = __dirname + '/data/users.json'
console.log('Manual:    ', manual)

// path.join() — safe across all operating systems
const joined = path.join(__dirname, 'data', 'users.json')
console.log('path.join: ', joined)

// path.resolve() — always returns an absolute path
const resolved = path.resolve('data', 'users.json')
console.log('Resolved:  ', resolved)

// path.join() combines multiple path segments into a single path.
// It usually returns a relative path unless an absolute path is provided as the first segment.
//
// path.resolve() converts the given path into an absolute path.
// If it encounters an absolute path in its arguments, it ignores all previous segments.
// Use join() to build paths and resolve() when you need the complete absolute file location.