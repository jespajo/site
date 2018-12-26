const express = require('express');
const path = require('path');
const fs = require('fs');
const request = require('request-promise');

const PORT = process.env.PORT || 5000;



const d = './public/d/';
let dJSON = [];
fs.readdir(d, (err, files) => {
  files.forEach(file => {
    if (file.endsWith(".html")) {

      const url = "https://jespajo.com/post/" + file;
      request(url)
        .then(function(html){
          /*
          const htmlElem = document.createElement('html');
          const frag = document.createDocumentFragment();
          htmlElem.innerHTML = html;
          frag.appendChild(htmlElem);
          const title = frag.firstChild.getElementsByTagName('title')[0].textContent
            || frag.firstChild.getElementsByTagName('title')[0].innerText;

          console.log(title);
          */
        })
        .catch(function(err){
          //handle error
        });


      // console.log(file);
    }
  });
});

/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.render('public/index.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
*/