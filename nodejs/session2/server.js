const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.json");

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  res.setHeader("Content-Type", "application/json");

  const data = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(data);

  if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200);
    res.end(JSON.stringify(users, null, 2));
  }

  else if (req.method === "GET" && req.url === "/users/top") {
    const topUsers = users.filter(user => user.score >= 90);

    res.writeHead(200);
    res.end(JSON.stringify(topUsers, null, 2));
  }

  else if (req.method === "GET" && req.url.startsWith("/users/")) {
    const id = req.url.split("/")[2];
    const user = users.find(u => u.id === Number(id));

    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify(user, null, 2));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "User not found" }));
    }
  }

  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});