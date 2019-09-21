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
    var bannerImage = document.getElementById("filePath").value;
    var model = {
      title,
      author,
      body,
      desc,
      language,
      mode,
      id,
      bannerImage
    };
    return model;
  }
};
BlogEditor.prototype.savepost();

function RoosterjsEditor() {}

RoosterjsEditor.prototype = {
  formatPost() {},
  addBannerImage() {
    document.getElementById("btnSubmit").addEventListener("click", function(e) {
      e.preventDefault();

      var head = new Headers();
      head.append("Accept", "application/json");
      var image = document.getElementById("fileUpload");
      var bodyData = new FormData();
      var file = image.files[0];
      bodyData.append("bannerImage", file);

      fetch("http://localhost:3030/upload", {
        method: "POST",
        headers: head,
        mode: "no-cors",
        body: bodyData
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          var fileValue = res.filePath;
          console.log(fileValue);
          document.getElementById("filePath").value = fileValue;
        });
    });
  }
};
RoosterjsEditor.prototype.addBannerImage();
