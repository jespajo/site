const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;



const d = './public/d/';
let json = [];

fs.readdir(d, (err, files) => {
  files.forEach(file => {
    if (file.endsWith(".html")) {
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
          
          // push obj to json
          const dObj = {
            date: date,
            title: title,
            url: d + file };
          json.push(dObj);
      });
    }
  });
});



/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.render('public/index.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
*/