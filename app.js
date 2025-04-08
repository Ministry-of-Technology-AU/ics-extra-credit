const express = require('express');
const fs = require('fs');
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
const path = require("path");

// Serve static files from the "public" directory
app.use(
  "/",
  express.static(__dirname + "/public", {
    dotfiles: "ignore", // Ignore dotfiles (e.g., .gitignore)
    etag: false, // Disable ETags for better caching control
    extensions: ["htm", "html"], // Serve HTML files without specifying the extension
    index: false, // Disable directory listing
    maxAge: "2d", // Cache static assets for two days
    redirect: false, // Disable automatic redirect
    setHeaders(res, path, stat) {
      res.set("x-timestamp", Date.now()); // Set custom response header
    },
  })
);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000!");
});
