// Imports
const fs = require("fs");

// Library of self-closing tags to replace
const replacements = {
  directory: require("./d").replacement
}

// Recursive function looks for tags (from library above)
// runs function associated with each
// and replaces tag with value returned by function
const runReplacements = function(html) {
  for (let tag of Object.keys(replacements)) {
    const element = "<" + tag + " />";
    if (html.includes(element)) {
      html = html.replace(element, replacements[tag](html))
      return runReplacements(html);
    }
  } 
  return html;
}

// HTML engine used by index.js
const engine = function (filePath, options, callback) {
  fs.readFile(filePath, function (err, html) {
    if (err) return callback(err);
    html = html.toString();
    html = runReplacements(html);
    return callback(null, html);
  });
}

module.exports = engine;