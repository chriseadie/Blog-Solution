const fs = require("fs");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const blogcontroller = require("./BlogController.js");
const _blogApi = new blogcontroller();

app.use(bodyparser.json({ type: "application/json" }));

app.get("/api/getAllPosts", async (req, res) => {
  var data = await _blogApi.getAllPosts();
  res.send(data);
});

app.get("/api/getPostById/:id", async (req, res) => {
  var data = await _blogApi.getPostById(req.params.id);
  res.send(data);
});

app.get("/api/deletePostById/:id", async (req, res) => {
  var data = await _blogApi.deletePostById(req.params.id);
  res.send(data);
});

app.get("/api/getPostByCategory/:category", (req, res) => {});

app.post("/api/addNewPost", async (req, res) => {
  if (req.body !== null && req.body !== undefined) {
    var data = await _blogApi.upsertPost(req.body);
    res.send("Write Complete");
  }
});
app.post("/api/editPost", async (req, res) => {
  if (req.body !== null && req.body !== undefined) {
    var data = await _blogApi.editPost(req.body);
    res.send("Edit Complete");
  }
});

app.listen("3080", () => {
  console.log("port starting on 3080");
});
