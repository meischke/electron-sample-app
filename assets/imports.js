const links = document.querySelectorAll('link[rel="templateimport"]');

function getTemplate(filepath) {
  return new Promise(function (resolve, reject) {
    fetch(filepath)
      .then(function (response) {
        // The API call was successful!
        return response.text();
      })
      .then(function (html) {
        // If successful, resolve the promis and passing back the response
        resolve(html);
      })
      .catch(function (err) {
        // There was an error
        reject(err);
      });
  });
}

function appendHTMLtemplate(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  let clone = document.importNode(
    doc.querySelector(".section-template").content,
    true
  );
  document.querySelector(".content").appendChild(clone);
}

// Import and add each HTML template to the DOM
Array.prototype.forEach.call(links, (link) => {
  if (typeof link.dataset.type !== "undefined" && link.dataset.type == "dir") {
    let dir = link.href.replace("file://", "");
    if (dir.slice(-1) == "/") dir = dir.slice(0, -1);
    const files = myAPI.globSync("".concat(dir, "/**/*.html"));
    files.forEach((file) => {
      getTemplate(file).then(
        function (html) {
          appendHTMLtemplate(html);
        },
        function (err) {
          console.log(err);
        }
      );
    });
  } else {
    getTemplate(link.href).then(
      function (html) {
        appendHTMLtemplate(html);
      },
      function (err) {
        console.log(err);
      }
    );
  }
});
