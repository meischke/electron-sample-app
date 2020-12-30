const section1btn = document.getElementById("section-1-btn");

section1btn.addEventListener("click", () => {
  myAPI.ipcSend('section-1-fileuploadbtn')
});

myAPI.ipcOn("section-1-got-file-content", (event, filecontent) => {
  document.getElementById("section-1-filecontent").innerHTML = filecontent;
});
