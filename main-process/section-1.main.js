const { ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

ipcMain.on("section-1-fileuploadbtn", (event) => {
  dialog
    .showOpenDialog({
      title: "Select the File to be uploaded",
      defaultPath: path.join(__dirname, "../"),
      buttonLabel: "Upload",
      // Restricting the user to only Text Files.
      filters: [
        {
          name: "Text Files",
          extensions: ["txt", "docx"],
        },
      ],
      // Specifying the File Selector Property
      properties: ["openFile"],
    })
    .then((file) => {
      // Stating whether dialog operation was
      // cancelled or not.
      if (!file.canceled) {
        // Updating the filepath variable
        // to user-selected file.
        let filepath = file.filePaths[0].toString();
        fs.readFile(filepath, { encoding: "utf-8" }, function (err, data) {
          if (!err) {
            event.sender.send("section-1-got-file-content", data);
          } else {
            console.log(err);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
