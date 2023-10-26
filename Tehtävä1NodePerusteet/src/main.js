// index.js
import http from "http";
import { getItems, getItemsById, postItem } from "./items.js";
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("REQUEST", req.method, req.url);
  const { method, url } = req;
  const reqParts = url.split("/");

  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1> Welcome to my API</h1>");
    res.write("<p> Welcome to my API<p>");
    res.end();
  } else if (method === "GET" && reqParts[1] === "items" && reqParts[2]) {
    console.log("GETting items with id", reqParts[2]);
    getItemsById(res, reqParts[2]);
  } else if (method === "GET" && reqParts[1] === "items") {
    console.log("GETting items");
    getItems(res);
  } else if (method === "POST" && reqParts[1] === "items") {
    console.log("POSting new items");
    postItem(res);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("<h1>Welcome to my REST API!</h1>");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
