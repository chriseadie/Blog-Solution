function BlogEditor() {}

BlogEditor.prototype = {
  savepost() {
    var btn = document.getElementById("save-post");
    if (btn) {
      btn.addEventListener("click", async function() {
        var post = await BlogEditor.prototype.generateModel();
        console.log(post);
        await fetch("http://localhost:3030/savedraft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post)
        });
      });
    }
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
  formatPost() {
    var editElements = document.querySelector(".tools-container");
    if (editElements) {
      document
        .getElementById("edit-bold")
        .addEventListener("click", function() {
          roosterjs.toggleBold(editor);
        });
      document
        .getElementById("edit-italic")
        .addEventListener("click", function() {
          roosterjs.toggleItalic(editor);
        });
      document
        .getElementById("edit-underline")
        .addEventListener("click", function() {
          roosterjs.toggleUnderline(editor);
        });
      document
        .getElementById("edit-heading")
        .addEventListener("change", function(e) {
          roosterjs.toggleHeader(editor, e.target.value);
        });
      document
        .getElementById("edit-align-left")
        .addEventListener("click", function() {
          roosterjs.setAlignment(editor, 0);
        });
      document
        .getElementById("edit-align-center")
        .addEventListener("click", function() {
          roosterjs.setAlignment(editor, 1);
        });
      document
        .getElementById("edit-align-right")
        .addEventListener("click", function() {
          roosterjs.setAlignment(editor, 2);
        });
    }
  },
  resetDefaultStyles() {
    var text = document.querySelector(".text-container div");
    if (text) {
      text.style = "";
    }
  },
  addBannerImage() {
    var upload = document.getElementById("btnSubmit");
    if (upload) {
      upload.addEventListener("click", function(e) {
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
  }
};
RoosterjsEditor.prototype.resetDefaultStyles();
RoosterjsEditor.prototype.formatPost();
RoosterjsEditor.prototype.addBannerImage();
