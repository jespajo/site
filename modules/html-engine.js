const fs = require("fs");

const replacements = {
  directory: function() {
    const dir = require("./d").dir;
    return "<table>" + 
      dir.reduce((acc, d) => {
          return acc + `
            <tr>
              <td>${d.date}</td>
              <td><a href=${d.url}>${d.title}</a></td>
            </tr>` }, "") + `
          </table>`;
  }//,
  //other: function(){}
}

// create array from keys
const tags = Object.keys(replacements);

const runReplacements = function(html) {
  for (let tag of tags) {
    const element = "<" + tag + " />";
    if (html.includes(element)) {
      html = html.replace(element, replacements[tag](html))
      return runReplacements(html);
    }
  } 
  return html;
}

const engine = function (filePath, options, callback) {
  fs.readFile(filePath, function (err, html) {
    if (err) return callback(err);
    html = html.toString();
    html = runReplacements(html);
    return callback(null, html);
  });
}

module.exports = engine;