## My website

Hello. My name is Jesse Paris-Jourdan and this is [my website](http://jespajo.com/)!

My approach is simple and DIY. The site is served by a Node.js app. I didn't use any frameworks or libraries, with the exception of Express. It's otherwise all vanilla js.

If I save files in `/public/pages/d/`, they automatically get scraped for info and linked [here](http://jespajo.com/d).

A unique Express template engine replaces PI nodes (such as `<?directory>`) with blocks of html after running specified processing instructions.


### To do

- Switch links.json into PostgreSQL database

- Simple md to html converter. This would allow me to save markdown files in `/d/` and have them rendered on a simple but nice-looking html page which then appears in the directory

- Add easter egg to `d` that shows the `display:none` table rows in the directory


### New pages

- My avocado tree (in progress!)

- Sketching page. A blank page with a canvas set up in a mobile friendly way with some configuration options
  - the ability to add an image url that will load and fill the page appropriately
  - you can shift the opacity of the image