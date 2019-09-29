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
const htmljs = require(__dirname + "/modules/html");
app.engine("html", htmljs.engine);

// /d and /d/-files
const djs = require(__dirname + "/modules/d");
app.use("/d", djs.router);

// Serve
const port = process.env.PORT || 4326;
app.listen(port, () => console.log(`Listening on ${port}`));
