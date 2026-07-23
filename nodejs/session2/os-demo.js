const os = require('os') //loading the built in os module package

console.log('Platform:     ', os.platform()) //returns the name of your os ex.windows or linux
console.log('Architecture: ', os.arch()) // returns the processor architecture such as arm or an x64 processor
console.log('Hostname:     ', os.hostname()) // return the name of the machine
console.log('Home dir:     ', os.homedir()) //return the name of your directory 
console.log('CPU cores:    ', os.cpus().length) // returns the number of cpu core your system can support

const totalMB = Math.round(os.totalmem() / 1024 / 1024)
const freeMB  = Math.round(os.freemem()  / 1024 / 1024)
console.log(`Memory: ${freeMB}MB free of ${totalMB}MB`)

const platform = os.platform()

if (platform === 'win32') {
  console.log('Running on Windows')
} else if (platform === 'darwin') {
  console.log('Running on Mac')
} else {
  console.log('Running on Linux')
}

const freePercent = Math.round((os.freemem() / os.totalmem()) * 100)
if (freePercent < 20) {
  console.log('Warning: Low memory —', freePercent + '% free')
} else {
  console.log('Memory OK —', freePercent + '% free')
}