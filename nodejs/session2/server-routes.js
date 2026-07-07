const http = require('http')
const os = require('os')

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  if (req.url === "/" && req.method === "GET") {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Home Page</title>
      </head>
      <body>
        <h1>Welcome to My Node.js Server</h1>
        <p>This is a proper HTML page.</p>
      </body>
    </html>
  `);
} else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('About page')

  } else if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }))

  } 
  
  else if (req.url === "/health") {

    const totalMB = Math.round(os.totalmem() / 1024 / 1024);
    const freeMB = Math.round(os.freemem() / 1024 / 1024);

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            status: "ok",
            platform: os.platform(),
            memory: {
                totalMB: totalMB,
                freeMB: freeMB
            },
            uptime: process.uptime()
        }, null, 2)
    );
}
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 — Page not found')
  }

  
})

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001')
})

// process.uptime() returns the number of seconds the current Node.js server
// has been running since it was started.

// Content-Type: application/json tells the browser that the response
// contains JSON data, so it should be interpreted as a JSON object instead
// of plain text or HTML.

// Health check endpoints are used to verify that a server is running correctly.
// They return basic information such as the server status, memory usage,
// operating system, and uptime. Monitoring tools and load balancers regularly
// access these endpoints to detect server failures and ensure only healthy
// servers receive client requests.