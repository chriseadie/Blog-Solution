const fetch = require("node-fetch");
const appsettings = require("../appsettings.json");

class Api {
  async getPostById(id) {
    var response = await fetch(`${appsettings.postsApi}/getPostById/${id}`);
    var res = await response.json();
    return res;
  }
  async getAllPosts() {
    var response = await fetch(`${appsettings.postsApi}/getAllPosts`);
    var res = await response.json();
    return res;
  }
  async upsertNewPost(post) {
    var response = await fetch(`${appsettings.postsApi}/addNewPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });
    if (response.status === 200) {
      return response.status;
    } else {
      return response.status;
    }
  }
  async deletePostById(id) {
    var response = await fetch(`${appsettings.postsApi}/deletePostById/${id}`);
    if (response.status == 200) {
      return response.status;
    }
  }
  async setPostToPublic(id) {
    var response = await fetch(
      `${appsettings.postsApi}/setPostToPublish/${id}`
    );
    if (response.status == 200) {
      return response.status;
    }
  }
  async editPost(post) {
    var response = await fetch(`${appsettings.postsApi}/editPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });
    return response.statusCode;
  }
  async promotePostToPublish(post) {
    var response = await fetch(`${appsettings.postsApi}/promotePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });
    return response.statusCode;
  }
}

module.exports = Api;
