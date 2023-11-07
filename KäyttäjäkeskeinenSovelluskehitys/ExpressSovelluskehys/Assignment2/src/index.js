// Implement a simple REST API with Express framework:

//     Use Pug as a template engine for basic HTML landing page GET / (1 point)
//     Implement a REST API by following this API reference with the mock data included in it (max. 4 points)

//     Continue with the project you created in the previous assignment and create a new branch express for this assignment.
//         use the existing code as a starting point or generate a new project with npm init
//     Install Express framework and Pug template engine
//     Render a dynamic HTML page with Express and Pug
//         provide some information about your API, use dynamic content rendering
//     Implement API endpoints following the API documentation and using the mock data provided
//         note that API documentation is not complete, you need to figure out missing details. for example add correct status codes and corresponding messages or data to the responses
//     Serve static media files from src/media folder
//         use e.g. some small-sized images from Internet
//         match the filenames with the mock data

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getItems, getItemsById, postItem } from "./items.js";
import { getUsers } from "./user.js";
import { getMedia } from "./media.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));

// simple custom middleware for logging/debugging all requests
app.use((req, res, next) => {
  console.log("Time:", Date.now(), req.method, req.url);
  next();
});

// render pug a file (home.pug) example
app.get("/", (req, res) => {
  const values = { title: "Dummy REST API docs", message: "TODO: docs" };
  res.render("home", values);
});

// dummy routing example
app.get("/kukkuu", (request, response) => {
  const myResponse = { message: "No moro!" };
  //response.json(myResponse);
  response.sendStatus(200);
});

// other dummy pug example
app.get("/:message", (req, res) => {
  const values = { title: "Dummy REST API docs", message: req.params.message };
  res.render("home", values);
});

// example generic items api

// get all items
app.get("/api/items", getItems);
// get items by id
app.get("/api/items/:id", getItemsById);
// modify
app.put("/api/items");
// add new item
app.post("/api/items", postItem);
// remove existing item
app.delete("/api/items");

// media endpoints
app.get("/api/media", getMedia);

// user endpoints
app.get("/api/user", getUsers);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
