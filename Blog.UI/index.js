var express = require("express");
var nunjucks = require("nunjucks");
const ApiClass = require("./BlogController");
var _api = new ApiClass();

var app = express();
app.use(express.static("Assets"));

nunjucks.configure("./Templates", {
  autoescape: true,
  express: app,
  watch: true
});

app.get("/", async (req, res) => {
  const data = await _api.getAllPosts();
  var filtered = data.filter(item => {
    return item.postStatus == "published";
  });
  filtered.sort((a, b) => {
    a = new Date(a.date);
    b = new Date(b.date);
    return a > b ? -1 : a < b ? 1 : 0;
  });
  res.render("index.njk", { data: filtered });
});
app.get("/post/:id", async (req, res) => {
  if (req.params.id !== "style.css" && req.params.id !== "scripts.js") {
    const data = await _api.getPostById(req.params.id);
    res.render("post.njk", { data: data[0] });
  }
});
app.get("/category/:category", async (req, res) => {
  const data = await _api.getPostByCategory(req.params.category);
  var filtered = data.filter(item => {
    return item.postStatus == "published";
  });
  res.render("index.njk", { data: filtered });
});
app.get("*", function(req, res) {
  res.render("404.njk");
});

app.listen(8080, () => {
  console.log("Server Started on port 8080");
});
