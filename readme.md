## My website

Hello. This is the personal website of Jesse Paris-Jourdan.

The site is a Node.js web server.

A unique Express.js template engine replaces specified self-closing tags such as `<directory />` with blocks of html code.

One module (`modules/d.js`) collates files in `d/` (along with links located in `d/extra.json` (which by the way I should change that to `.csv`—easier to manage)) into a JavaScript object and converts the object into a [directory](http://jespajo.com/d). The purpose is to make uploading a new html page on my site as simple as dropping it into a folder and pushing the site to Heroku—the directory is generated automatically.

My approach is simple and DIY. I didn't use any frameworks or libraries. It's all vanilla js.


### To do

- Finish stabilising everything in `d/` now that the refactoring is complete.

- Simple md to html converter. This would allow me to save markdown files in `d/` and have them rendered on a simple but nice-looking html page which then appears in the directory.

- Add Google Analytics.
