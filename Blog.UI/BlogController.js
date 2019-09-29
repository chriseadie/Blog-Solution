const fetch = require("node-fetch");
const appsettings = require("../appsettings.json");

class Api {
  async getAllPosts() {
    var response = await fetch(`${appsettings.postsApi}/getAllPosts`);
    var res = await response.json();
    return res;
  }
  async getPostById(id) {
    var response = await fetch(`${appsettings.postsApi}/getPostById/${id}`);
    var res = await response.json();
    return res;
  }
  async getPostByCategory(category) {
    var response = await fetch(
      `${appsettings.postsApi}/getPostByCategory/${category}`
    );
    var res = await response.json();
    return res;
  }
  async addCommentToPost(comment) {
    var response = await fetch(`${appsettings.postsApi}/addCommentToPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment)
    });
    return response;
  }
}
module.exports = Api;
