function BlogEditor() {}

BlogEditor.prototype = {
  savepost() {
    var btn = document.getElementById("save-post");
    btn.addEventListener("click", async function() {
      var post = await BlogEditor.prototype.generateModel();
      console.log(post);
      await fetch("http://localhost:3030/savedraft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
      });
    });
  },
  generateModel() {
    var body = document.getElementById("editorDiv").innerHTML;
    var title = document.getElementById("post-title").value;
    var desc = document.getElementById("post-description").value;
    var author = document.getElementById("post-author").value;
    var language = document.getElementById("post-language").value;
    var mode = document.getElementById("editor-type").value;
    var id = document.getElementById("editor-id").value;
    var model = {
      title,
      author,
      body,
      desc,
      language,
      mode,
      id
    };
    return model;
  }
};

BlogEditor.prototype.savepost();
