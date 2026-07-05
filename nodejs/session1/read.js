const read = require('readline')
const r1 = read.Interface({
    input:process.stdin,
    output:process.stdout
})
r1.question("enter your name:",function(name){
    console.log(`name:${name}`);
    r1.close();
})