# My personal internet

The goal for this site is eventually to host it on a node.js web server, with the ability for me to, with a single git push, both 1) create a new post and 2) update the index with a 
link and description of the post. The idea would also be to build something using vanilla JS that only does what I need it to do and nothing else. No full blog frameworks or anything like that.

A post could then look something like this:

    {{ > header }}
      <title>An example post</title>

      <meta name="date" content="2018-12-01T01:00:00+1100">
      <meta name="info" content="[icon] [julia]">
    </head>
    <body>
      <!-- Main content of the post would go here -->
    {{ > footer }}
