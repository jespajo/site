## My website

Hello. My name is Jesse Paris-Jourdan and this is [my website](http://jespajo.com/)!

My approach is simple and DIY. The site is served by a Node.js app. I didn't use any frameworks or libraries. It's all vanilla js.

If I save files in `public/pages/d/`, they automatically get scraped for info and linked [here](http://jespajo.com/).

A unique Express.js template engine replaces specified self-closing tags such as `<directory />` with blocks of html code.


### To do

- Continue rewriting `index.js`

- Finish stabilising everything in `d/` when refactoring is complete

- Make `links.json` update with all the links in `d/` 
  - use the URL as the identifier i.e.
    - if URL exists, then update title
    - else create
      - if no date specified then use current date!

- Simple md to html converter. This would allow me to save markdown files in `d/` and have them rendered on a simple but nice-looking html page which then appears in the directory

- Add Google Analytics (lightest option)
