console.log("Node version:", process.version)
console.log("Platform:", process.platform)
console.log("Current directory:", process.cwd())
console.log("Memory usage:", process.memoryUsage())
const args = process.argv
console.log("All arguments:", args)
console.log("Your input:", args[2])
console.log("NODE_ENV:", process.env.NODE_ENV)
console.log("HOME:", process.env.HOME || process.env.USERPROFILE)

// Node version: v24.16.0
// Platform: win32
// Current directory: C:\Users\Ashwath\Desktop\Typescript\typescript\nodejs\session1
// Memory usage: {
//   rss: 36048896,
//   heapTotal: 6496256,
//   heapUsed: 4787968,
//   external: 1773498,
//   arrayBuffers: 22815
// }
// All arguments: [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\Ashwath\\Desktop\\Typescript\\typescript\\nodejs\\session1\\process-demo.js'
// ]
// Your input: undefined
// NODE_ENV: undefined

// Command line arguments are useful when a program needs input from the user
// without changing the source code. 

// Environment variables are used to store sensitive information such as
// database passwords, API keys, and secret tokens outside the source code.