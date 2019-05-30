# my personal website

hello. this is the personal website of jesse paris–jourdan. what are you doing here?

# to do:

- redo everything in a way that makes more sense to you lol
- add google analytics
- add simple `.md` to `.html` converter so i can upload pages as `.md`s

## new structure?

root
- readme.md
- private/
  - drafts
  - ngrok
- .npmrc
- .gitignore (private/ and .gitignore and .npmrc)
- Procfile
- node_modules/
- package.json
- index.js
- modules
  - md to html converter
  - thing that calculates dates html table
- jespajo.com/
  - partials/
  - pages/
    - index.ejs
    - d.ejs
    - d/
      - all .ejs experiments
      - all .md files
      - extra.json
  - lib/ (everything i need for the site that is stored statically (i.e. as a file with an extension))
    - css, js
    - icons/
    - other images