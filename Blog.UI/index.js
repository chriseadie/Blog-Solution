var express = require("express");
var nunjucks = require("nunjucks");

var app = express();
app.use(express.static("Assets"));

nunjucks.configure("./Templates", {
  autoescape: true,
  express: app,
  watch: true
});

app.get("/", (req, res) => {
  const data = { hello: "Hello World" };
  res.render("homepage.njk", data);
});

app.listen(8080, () => {
  console.log("Server Started on port 8080");
});
