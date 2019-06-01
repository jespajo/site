/* Imports */
const fs = require("fs");

/* In the object below, each of the self-closing tags (such as `<directory />`)
 * I use in various html files is associated with a function. When the user 
 * opens a page containing this kind of tag, the app executes the function and
 * replaces the tag with the string returned by the function.
 */
const replacements = {
  directory: function() {
    const dir = require("./d").dir;
    return "<table>" + 
      dir.reduce((acc, d) => {
          return acc + `
            <tr>
              <td>${d.dateText}</td>
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