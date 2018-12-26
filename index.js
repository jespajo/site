const express = require('express');
const path = require('path');
const fs = require('fs');
const jsdom = require("jsdom");

const port = process.env.PORT || 5000;

const d = './views/d/';
let ds = [];
let no1 = 0;
fs.readdir(d, (err, files) => {
  files.forEach(file => {
    if (file.endsWith(".html")) {
      no1++;
    }
  });
});

let no2 = 0;

fs.readdir(d, (err, files) => {
  files.forEach(file => {
    if (file.endsWith(".html")) {
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
            url: d + file };
          
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
    
    /*
    express()
      .use(express.static(path.join(__dirname, 'public')))
      .set('public', path.join(__dirname, 'public'))
      .get('/', (req, res) => res.render('index.html'));
    

    for (let d of ds) {
      const file = d.url.substring(8, d.url.length - 5);
      console.log(file);
      express()
        .use(express.static(path.join(__dirname, 'public')))
        .set('public', path.join(__dirname, 'public'))
        .get(file, (req, res) => res.render(file + ".html"));

    }

    express().listen(port, () => console.log(`Listening on ${port}`));
  
    */

    express()
      .use(express.static(path.join(__dirname + '/public')))
      .engine('html', require('ejs').renderFile)
      .set('view engine', 'html')
      .get('/d/20181225', function (req, res) {
        res.render('d/20181225');
      })
      .listen(port, () => console.log(`Listening on ${port}`))

  });
  
}
