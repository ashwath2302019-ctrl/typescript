const fs = require("fs/promises");

async function main() {
  await fs.writeFile("output.txt", "Hello from async file!");

  const data = await fs.readFile("output.txt", "utf-8");

  console.log(data);
}

main();

const path = require("path");

const filePath = path.join(__dirname, "output.txt");

console.log(filePath);

const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("Enter your name: ", function(name) {
//   console.log(`Hello, ${name}!`);
//   rl.close();
// });
