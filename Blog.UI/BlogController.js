const fetch = require("node-fetch");
const appsettings = require("../appsettings.json");

class Api {
  async getAllPosts() {
    var response = await fetch(`${appsettings.postsApi}/getAllPosts`);
    var res = await response.json();
    return res;
  }
}
module.exports = Api;
