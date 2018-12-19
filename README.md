# Hello

## Current goals for the site

1. create a web server and serve your website dynamically. for each web feature you should only need to push the html code and the `./d` page will update with all of the titles and links.
- `./d/20181212.html` -> `./d/20181212`
- pushing a post to master (or heroku) should update the database
- the database (`./d/index.json` ?) needs to include only:
  - date (auto created on first push to master based on `Date.now()`, does not change in subsequent pushes)
  - location of html file
  - title
  (because that's all that will display in the on `./d`)
2. reconfigure the home page so it's more of an intro with a link to `/d`
3. long term: each page can also include @header stuff and it will auto load
