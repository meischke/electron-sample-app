const csslinks = document.querySelectorAll('link[rel="cssimport"]');
const templatelinks = document.querySelectorAll('link[rel="templateimport"]');

function getFileContent(filepath) {
  return new Promise(function (resolve, reject) {
    fetch(filepath)
      .then(function (response) {
        // The API call was successful!
        return response.text();
      })
      .then(function (txt) {
        // If successful, resolve the promis and passing back the response
        resolve(txt);
      })
      .catch(function (err) {
        // There was an error
        reject(err);
      });
  });
}

function appendHTML(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  let clone = document.importNode(
    doc.querySelector(".section-template").content,
    true
  );
  document.querySelector(".content").appendChild(clone);
}

function appendCSS(file){
  console.log(file)
  let link = document.createElement('link');  
  link.rel = 'stylesheet';  
  link.type = 'text/css'; 
  link.href = file;   
  document.getElementsByTagName('HEAD')[0].appendChild(link); 
}

// Import each CSS file
Array.prototype.forEach.call(csslinks, (link) => {
  if (typeof link.dataset.type !== "undefined" && link.dataset.type == "dir") {
    let dir = link.href.replace("file://", "");
    if (dir.slice(-1) == "/") dir = dir.slice(0, -1);
    const files = myAPI.globSync("".concat(dir, "/**/*.css"));
    files.forEach((file) => {
      appendCSS(file);
    });
  } else {
    appendCSS(link.href);
  }
});

// Import each HTML template to the DOM
Array.prototype.forEach.call(templatelinks, (link) => {
  if (typeof link.dataset.type !== "undefined" && link.dataset.type == "dir") {
    let dir = link.href.replace("file://", "");
    if (dir.slice(-1) == "/") dir = dir.slice(0, -1);
    const files = myAPI.globSync("".concat(dir, "/**/*.html"));
    files.forEach((file) => {
      getFileContent(file).then(
        function (html) {
          appendHTML(html);
        },
        function (err) {
          console.log(err);
        }
      );
    });
  } else {
    getFileContent(link.href).then(
      function (html) {
        appendHTML(html);
      },
      function (err) {
        console.log(err);
      }
    );
  }
});
