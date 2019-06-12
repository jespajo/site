const express = require("express");
const app = express();

// Static files in library
app.use(express.static(__dirname + "/public/lib"));

// Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/index.html");
});

// Template engine for HTML
app.set("views", __dirname + "/public/pages/");
const htmlEngine = require(__dirname + "/modules/html-engine");
app.engine("html", htmlEngine.engine);

// /d and /d/-files
const d = require(__dirname + "/modules/d");
app.use("/d", d.router);

// Serve
const port = process.env.PORT || 4321;
app.listen(port, () => console.log(`Listening on ${port}`));