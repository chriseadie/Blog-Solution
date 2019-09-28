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
  res.render("homepage.njk", { data: filtered });
});

app.listen(8080, () => {
  console.log("Server Started on port 8080");
});
