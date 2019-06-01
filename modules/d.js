const express = require('express');
const fs = require("fs");

const router = express.Router();

/* currently useless */
let links = fs.readFileSync("jespajo.com/pages/d/links.json");
links = JSON.parse(links);
// console.log(links);
fs.readdir("jespajo.com/pages/d/", (err, files) => {
  // console.log(files);
});
/* endof currently useless */

const dir = [
  {
    date: "20180818",
    title: "Hello Theon!",
    url: "https://google.com/"
  }, {
    date: "20170302",
    title: "feopkpok!",
    url: "https://duckduckgo.com/"
  }
];

router.get('/', function (req, res) {
  res.render("d.html", dir);
});

/* export */
module.exports.router = router;
module.exports.dir = dir;