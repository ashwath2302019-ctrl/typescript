const fs = require('fs/promises')
const path = require('path')

async function main() {
    await fs.writeFile('Self-learning.txt',"hello world")
    const read = await fs.readFile('self-learning.txt','utf-8')
    console.log(read);
}
main();

// 🔍 Research what `Content-Type` headers do. Find out the difference between `text/plain`, `text/html`, and `application/json`.
//  Update `server-routes.js` to return a proper HTML page on the `/` route using `Content-Type: text/html`.

//Content-Type tells the browser/client what type of data the server is sending. Example: HTML, plain text, 
// or JSON.

const http = require('http')
const server = http.createServer((req,res)=>{
    console.log(`${req.url} ${req.method}`)
    if(req.url==='/'){
        res.writeHead(200,{
            "content-type" : "plain|text" 
        })
        res.end("welcome to self learning -  by ashwath")
        }
         else if (req.url==='/html'){
            res.setHeader("Content-Type", "text/html");
        res.end("<h1>Hello World</h1>");
        }
         else  if (req.url === '/json'){
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Hello" }));
        }  else {
            res.setHeader("Content-Type", "text/plain");
             res.end("Enter valid url");
        }
})
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})

// 🔍 Research `fs.readdirSync`. Write a script that reads the contents of the 
// `nodejs/session2/` folder and lists all `.js` files with their file sizes in KB.

// fs.readdirSync() reads the contents of a folder synchronously, meaning Node.js waits until the folder 
// reading is finished before moving to the next line. The Node.js fs module is used for file system operations.

const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname);

const files = fs.readdirSync(folderPath);

files.forEach((file) => {
  if (file.endsWith(".js")) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    const sizeInKB = stats.size / 1024;

    console.log(`${file} - ${sizeInKB.toFixed(2)} KB`);
  }
});