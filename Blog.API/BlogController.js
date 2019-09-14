const fs = require("fs");
const posts = require("./localdata/post.json");
const guid = require("./helpers/guid");
var savePostModel = require("./models/saveBlogPost");

class BlogApi {
  getAllPosts() {
    if (Object.entries(posts).length > 0) {
      var allposts = Object.values(posts);
      allposts.sort((a, b) => {
        var dateA = new Date(a.dateCreated),
          dateB = new Date(b.dateCreated);
        return dateA - dateB;
      });
      return allposts;
    }
    return { error: "There are currently no posts" };
  }
  getPostById(id) {
    if (id !== null || id !== "") {
      var allposts = Object.values(posts);
      var getPost = allposts.filter(item => {
        return item.id == id;
      });
      if (getPost) {
        return getPost;
      }
    }
  }
  getPostByCategory(category) {
    if (category !== null || category !== "") {
      var allposts = Object.values(posts);
      var filterposts = allposts.filter(items => {
        return items.category == category;
      });
      return filterposts;
    }
  }
  editPost(obj) {
    var allposts = Object.values(posts);
    allposts.forEach(element => {
      if (element.id === obj.id) {
        element.body["en-us"] = obj.body;
        element.author = obj.author;
        element.description = obj.desc;
        element.title = obj.title;
      }
    });
    console.log(allposts);
    fs.writeFile("./localdata/post.json", JSON.stringify(posts), err => {
      if (err) {
        console.log(err);
      }
      return;
    });
  }
  upsertPost(obj) {
    var setID = guid();
    var date = new Date();
    savePostModel = {
      [setID]: {
        title: obj.title,
        id: setID,
        date: date,
        author: obj.author,
        body: {
          "en-us": obj.body
        },
        description: obj.desc,
        readTime: obj.readTime,
        templateId: obj.templateId,
        postStatus: "draft"
      }
    };
    Object.assign(posts, savePostModel);

    fs.writeFile("./localdata/post.json", JSON.stringify(posts), err => {
      if (err) {
        console.log(err);
      }
      return;
    });
    return;
  }
}

module.exports = BlogApi;
