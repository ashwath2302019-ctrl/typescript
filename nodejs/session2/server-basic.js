const http = require('http')

const server = http.createServer((req, res) => {
      console.log(`${req.method} ${req.url}`)

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Node.js!')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})





// **Write a comment** explaining what `req` and `res` are and what role each plays.
//req = stands for request which handles the user request including the url , http methods and 
//headers which send to the browser.
//res = stands for response in which the http sends the request to server and server recives it and respond back 
//with a content present in it such as web page,json data etc.  .

// req.method contains the HTTP method used by the client to make the request,
// such as GET, POST, PUT, or DELETE.

// req.url contains the URL or route requested by the client,
// such as "/", "/about", or "/users".