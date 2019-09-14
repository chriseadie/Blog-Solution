const fetch = require("node-fetch");

class Api {
  async getPostById(id) {
    var response = await fetch(`http://localhost:3080/api/getPostById/${id}`);
    var res = await response.json();
    return res;
  }
  async getAllPosts() {
    var response = await fetch("http://localhost:3080/api/getAllPosts");
    var res = await response.json();
    return res;
  }
  async upsertNewPost(post) {
    var response = await fetch("http://localhost:3080/api/addNewPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: post
    });
    if (response.statusCode === 200) {
      console.log("success");
    } else {
      console.log("failed");
    }
  }
  async editPost() {}
}

module.exports = Api;
