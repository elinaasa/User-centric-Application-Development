// index.js
import http from "http";
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("REQUEST", req.method, req.url);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Welcome to my REST API!</h1>");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
