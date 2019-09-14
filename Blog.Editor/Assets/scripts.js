function BlogEditor() {}

BlogEditor.prototype = {
  savepost() {
    var btn = document.getElementById("save-post");
    var mode = document.getElementById("editor-type").value;
    btn.addEventListener("click", function() {
      var post = BlogEditor.prototype.generateModel();
      fetch();
    });
  },
  generateModel() {
    var body = document.getElementById().innerHTML;
    var title = document.getElementById().value;
    var desc = document.getElementById().value;
    var author = document.getElementById().value;
    var language = document.getElementById().value;
    var mode = document.getElementById("editor-type").value;
    var model = {
      title,
      author,
      body,
      desc,
      language,
      mode
    };
    return model;
  }
};

BlogEditor.prototype.savepost();
