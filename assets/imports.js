const links = document.querySelectorAll('link[rel="templateimport"]')

function getTemplate(filepath){
  return new Promise(function(resolve, reject) {
    fetch(filepath).then(function (response) {
      // The API call was successful!
      return response.text()
    }).then(function (html) {
      // If successful, resolve the promis and passing back the response
      resolve(html);
    }).catch(function (err) {
      // There was an error
      reject(err)
    })
  })
}

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  getTemplate(link.href)
    .then( function (html) {
      let doc = new DOMParser().parseFromString(html, "text/html")
      let clone = document.importNode(doc.querySelector('.section-template').content, true)
      document.querySelector('.content').appendChild(clone)
    }, function(err) {
      console.log(err)
    })
})
