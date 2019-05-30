/* Import modules */
const express = require("express");
const path = require("path");

/* Global stuff */
const app = express();

/* Serve static files in library */
app.use(express.static(__dirname + "/jespajo.com/lib"));

/* Serve home page */
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/jespajo.com/pages/index.html"));
});

/********************
 BIG D SECTION
*******************/

/* SERVE D.HTML  
*/

// const table = require("./modules/table.js");

const fs = require('fs');

/* Engine for dealing with d.html */
app.engine('html', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, html) {
    if (err) return callback(err)

    if (filePath === __dirname + "/jespajo.com/pages/d.html") {
      const directory = "<table>" + 
        options.dir.reduce((acc, d) => { return acc + `
          <tr>
            <td>${d.date}</td>
            <td><a href=${d.url}>${d.title}</a></td>
          </tr>` }, "") + `
        </table>`;
      html = html.toString()
        .replace("<directory />", directory);
    }

      return callback(null, html)
  })
})

app.get('/d', function (req, res) {
  app.set('views', './jespajo.com/pages/')
  res.render("d.html", {
    dir: [
    {
      date: "20180818",
      title: "Hello there! I have depression!",
      url: "https://google.com/" },
    {
      date: "20170302",
      title: "fuck you!",
      url: "https://duckduckgo.com/" }
    ]
  });
})



/* SERVE EVERYTHING IN THE D FOLDER
  1. html's

  2. .md's

    - link to md.js

  3. other links (stored as .csv)

  */

/********************
 END OF BIG D SECTION
*******************/
  

/* SERVE!
*/
const server = app.listen(4005);






/*

const express = require('express');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 5000;

const d = './jespajo.com/pages/d/';
let ds = [];
let no1;
fs.readdir(d, (err, files) => {
  no1 = files.reduce((a, c) => c.endsWith(".ejs") ? a + 1 : a, 0);
});

let no2 = 0;

fs.readdir(d, (err, files) => {
  files.forEach(file => {
    if (file.endsWith(".ejs")) {
      const dPromise = new Promise((resolve, reject) => {
        fs.readFile(d + file, 'utf8', function(err, html) {
          if (err) throw err;

          // find title
          const titlePos = [
            html.search("<title>") + 7,
            html.search("</title>") ];
          const title = html.substring(titlePos[0], titlePos[1]);

          // find date
          let date;
          const datePos = html.search('<meta name="date"');

          // if no date <meta> just use title
          if (datePos === -1) {
            date = file.substring(0, 8); }
          else {
            date = html.substring(datePos + 27, datePos + 35); }
          date = date.substring(0, 4) +
            "-" + date.substring(4, 6) +
            "-" + date.substring(6, 8);
          date = new Date(date).toISOString();

          const obj = {
            date: date,
            title: title,
            file: "pages/d/" + file };
          
          resolve(obj);
        });
      }).then(function(val) {
        ds.push(val);
        no2++;
        if (no1 === no2) {
          serve();
        }
      });
    };
  });
});

const serve = () => {
  Promise.all(ds)
  .then(function(vals) {

    // formatting
    let list = vals;

    // add extras
    let extras = fs.readFileSync("jespajo.com/pages/d/extra.json");
    extras = JSON.parse(extras);
    for (let e of extras) {
      list.push(e);
    }

    list.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date); });
    list.forEach(function(val) {
      const year = val.date.substring(2, 4);
      let month = val.date.substring(5, 7);
      let day = val.date.substring(8, 10);
      const removeZeroes = (no) => {
        if (no.charAt(0) === "0") {
          return " " + no.charAt(1); }
        else {
          return no; } };
      month = removeZeroes(month);
      day = removeZeroes(day);
      const date = day + "/" + month + "/" + year;
      val.date = date;
      if (!val.url) {
        val.url = val.file.substring(5, val.file.length - 4);
      }
    });

    const app = express();
    
    app.use(express.static(path.join(__dirname + '/jespajo.com/lib')))
      .engine('html', require('ejs').renderFile)
      .set('view engine', 'html');

    app.use('/d/src', express.static('jespajo/pages/d/src'));
    // render all the ds
    for (let d of ds) {
      const file = d.file;
      const url = file.substring(5, file.length - 4);
      app.get(url, (req, res) => { res.render(file); }); }

    app.get('/', (req, res) => { res.render('pages/index.ejs'); });
    app.get('/d', (req, res) => {
      res.render('pages/d.ejs', {
        ds: list
      });
    });
    app.listen(port, () => console.log(`Listening on ${port}`));

  });
};

*/