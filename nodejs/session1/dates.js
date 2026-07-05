const dayjs = require("dayjs");
console.log('hello buddy today ');
console.log("Todays days is:",dayjs().format('DD/MM/YYYY'));
console.log("Day of week:", dayjs().format('dddd'))
console.log("Next week:", dayjs().add(7, 'day').format('DD MMM YYYY'))
console.log("Is before 2030?", dayjs().isAfter('2019-01-01'))

// **Write a comment** explaining what `require('dayjs')` does and where Node.js looks to find it.

// As the nodejs doesn't automatically load the package so we are requesting the package from node using 
// require keyword and node.js find it in node module whether the package is present if present it display the 
//results