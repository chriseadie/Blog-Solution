const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const nunjucks = require("nunjucks");
const ApiClass = require("./ApiClass");
const multer = require("multer");
const path = require("path");
const user = require("./user");
const fs = require("fs");
const session = require("express-session");
const _api = new ApiClass();

app.use(
  session({
    secret: "secret-ket-one",
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 43200000
    }
  })
);
app.use(express.static("Assets"));
nunjucks.configure("./templates", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json({ type: "application/json" }));

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "../Blog.UI/Assets/images/",
  filename: function(req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({
  storage: storage
}).single("bannerImage");

// renders the login screen so that users can login
app.get("/", (req, res) => {
  res.render("index.njk");
});

app.post("/login", (req, res) => {
  if (req.body.username == user.username) {
    if (req.body.password == user.password) {
      req.session.jwt = "HelloWorld";
      res.redirect("/posts");
    }
  } else {
    res.redirect("/?error=unauthorised");
  }
});

app.get("/createnewpost", (req, res) => {
  res.render("editor.njk");
});
// Renders the editor for users to create or edit posts from
app.get("/editor/:id", async (req, res) => {
  if (req.params.id !== "style.css" && req.params.id !== "scripts.js") {
    var data = await _api.getPostById(req.params.id);
    res.render("editor.njk", { data: data[0] });
  }
});
// renders all the posts that are available to edit. controls for deletion be available on this screen
app.get("/posts", async (req, res) => {
  var token = req.session.jwt;
  if (token === "HelloWorld") {
    var data = await _api.getAllPosts();
    res.render("posts.njk", { data: data });
  } else {
    res.redirect("/");
  }
});
// allows the user to save a draft which they can then come back and edit it later
app.post("/savedraft", async (req, res) => {
  if (req.body !== null && req.body !== undefined) {
    if (req.body.mode === "edit") {
      var body = await _api.editPost(req.body);
      res.end();
    } else {
      var body = await _api.upsertNewPost(req.body);
      res.end();
    }
  }
});
// takes a post from the reviewal file and added it to the live file for views to see
app.post("/publishpost", async (req, res) => {
  var body = await _api.promotePostToPublish(req.body);
  res.end();
});
// Deletes a posts from the local file either in live file or reviewal file
app.get("/deletepost/:id", async (req, res) => {
  if (req.params.id !== "style.css" && req.params.id !== "scripts.js") {
    var data = await _api.deletePostById(req.params.id);
    if (data == 200) {
      res.redirect("/posts");
      return;
    }
  }
});

// Uploads main banner image to the assets folder where it can be accessed
app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send("Something went wrong");
    } else {
      res.send({ filePath: `/images/${req.file.filename}` });
    }
  });
});

app.get("/setPostToPublic/:id", async (req, res) => {
  if (req.params.id !== "style.css" && req.params.id !== "scripts.js") {
    var data = await _api.setPostToPublic(req.params.id);
    res.redirect("/posts");
  }
});

app.post("/deleteUpload", (req, res) => {
  var imageName = req.params.name;
  var imageType = req.params.type;
  try {
    fs.unlinkSync("../Blog.UI/Assets/images/" + imageName + "." + imageType);
    res.send("successful Deletion");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3030, () => {
  console.log("Blog editor launched on port 3030");
});
