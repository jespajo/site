/* Import modules */
const express = require("express");
const app = express();

/* Static files in library */
app.use(express.static(__dirname + "/public/lib"));

/* Home page */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/pages/index.html");
});

/* Template engine for HTML */
app.set("views", __dirname + "/public/pages/");
const htmlEngine = require(__dirname + "/modules/html-engine.js");
app.engine("html", htmlEngine);

/* /d and /d/-files */
const d = require(__dirname + "/modules/d.js");
app.use("/d", d.router);

/* Serve! */
const port = process.env.PORT || 3241;
app.listen(port, () => console.log(`Listening on ${port}`));