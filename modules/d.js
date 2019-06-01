const express = require("express");
const fs = require("fs");

const router = express.Router();

let links = fs.readFileSync("jespajo.com/pages/d/links.json");
links = JSON.parse(links);

fs.readdir("jespajo.com/pages/d/", (err, files) => {
  for (let file of files) {
    const [fileName, fileExtension] = file.split(".");

    if (fileExtension === "html") {

      const row = {
        url: "d/" + fileName,
        date: "DEFAULT",
        title: "DEFAULT"
      };

      /* CURRENTLY WORKING ON THIS SECTION (CWOTS)
       
        to do
        - clean up title finding  
        - finish date finding
        - add "hidden" functionality

       */

      fs.readFile("jespajo.com/pages/d/" + file, "utf8", function(err, html) {
        if (err) throw err;

        // find title
        const titlePos = [
          html.search("<title>") + 7,
          html.search("</title>") ];
        const title = html.substring(titlePos[0], titlePos[1]);
        row.title = title;
      
      });

        /*
        // find date
        let date;
        const datePos = html.search('<meta name="date"');

        // if no date <meta> just use title
        if (datePos === -1) {
          date = file.substring(0, 8); }
        else {
          date = html.substring(datePos + 27, datePos + 35); }
        
        */
      /* END CWOTS */


      links.push(row);

      // Serve each page
      router.get(fileName, function (req, res) {
        res.render("d/" + file);
      });

    }
  } 
});

// Serve main d page
router.get('/', function (req, res) {
  res.render("d.html");
});

// Sort links
links.sort(function(a, b) {
  return b.date - a.date;
});

// Create dateText: from "20190602" to "6/ 2/19" etc.
links.forEach(link => {
  const ld = link.date;
  const d = ld.slice(7 - (ld.charAt(6) !== "0"));
  const m = ld.slice(5 - (ld.charAt(4) !== "0"), 6);
  const y = ld.slice(2, 4);
  link.dateText = [d, (" " + m).slice(-2), y].join("/");
});

// Exports
module.exports.router = router;
module.exports.dir = links;