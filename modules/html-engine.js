const fs = require("fs");

// Object of processing instructions
const pis = {
  directory: require("./d").pi
}

// Recursive function looks for instructions (from object above)
// runs function associated with each
// and replaces PI node with value returned by function
const execPIs = (html) => {
  for (let tag of Object.keys(pis)) {
    const pi = "<?" + tag + ">";
    if (html.includes(pi)) {
      html = html.replace(pi, pis[tag]);
      return execPIs(html);
    }
  } 
  return html;
}

// HTML engine used by index.js
module.exports.engine = (filePath, options, callback) => {
  fs.readFile(filePath, (err, html) => {
    if (err) return callback(err);
    html = html.toString();
    html = execPIs(html);
    return callback(null, html);
  });
}