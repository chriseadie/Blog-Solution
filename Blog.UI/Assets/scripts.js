function Eadie() {}

Eadie.prototype = {
  addCommentToPost() {
    document
      .getElementById("submitComment")
      .addEventListener("click", function() {
        var comment = Eadie.prototype.generateComment();
        // fetch("http://localhost:8080/addCommentToPost", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(comment)
        // }).then(() => {
        //   Eadie.prototype.addCommentToDom(comment);
        // });
        Eadie.prototype.addCommentToDom(comment);
      });
  },
  generateComment() {
    var commentValue = document.getElementById("commentBox").value;
    var commentModel = {
      comment: commentValue,
      date: new Date()
    };
    return commentModel;
  },
  addCommentToDom(comment) {
    var commentBox = document.createElement("div");
    var domContainer = document.getElementById("user-comment-box");
    commentBox.className = "comment-box";
    commentBox.innerHTML = comment.comment;
    domContainer.prepend(commentBox);
  }
};

Eadie.prototype.addCommentToPost();
