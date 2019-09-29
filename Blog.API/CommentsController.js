const posts = require("./localdata/post.json");
const fs = require("fs");

class Comments {
  addNewComment(comment) {
    var allPosts = Object.values(posts);
    var post = allPosts.filter(item => {
      return item.id == comment.id;
    });
    if (post) {
      post[0].comments.unshift(comment);
    }
    fs.writeFileSync("./localdata/post.json", JSON.stringify(post), err => {
      if (err) {
        return "error";
      }
      return "success";
    });
  }
}

module.exports = Comments;
