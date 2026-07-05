const file = require("fs");
const date = require("dayjs");

const role = process.argv[2];

const read = file.readFileSync("data.json", "utf-8");
const users = JSON.parse(read);

const match = users.users.filter(u => u.role === role);

console.log(`Report Date is: ${date().format("DD/MM/YYYY")}`);
console.log(`Role: ${role}`);

match.forEach(u => {
    console.log(`${u.name}, ${u.id}`);
});

console.log(`Total length: ${match.length}`);