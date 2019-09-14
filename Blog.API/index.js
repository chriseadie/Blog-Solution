const fs = require("fs");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const blogcontroller = require("./BlogController.js");
const _blogApi = new blogcontroller();

app.use(bodyparser.json());

app.get("/api/getAllPosts", async (req, res) => {
  var data = await _blogApi.getAllPosts();
  res.send(data);
});

app.get("/api/getPostById/:id", async (req, res) => {
  var data = await _blogApi.getPostById(req.params.id);
  res.send(data);
});

app.get("/api/getPostByCategory/:category", (req, res) => {});

app.post("/api/addNewPost", (req, res) => {
  if (req.body !== null && req.body !== undefined) {
    var data = _blogApi.upsertPost(req.body);
    res.send("Write Complete");
  }
});
app.post("/api/editPost", (req, res) => {
  if (req.body !== null && req.body !== undefined) {
  }
});

app.listen("3080", () => {
  console.log("port starting on 3080");
});
