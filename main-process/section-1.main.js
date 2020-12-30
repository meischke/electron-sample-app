const {app, ipcMain} = require('electron')

ipcMain.on('section-1-get-app-path', (event) => {
  event.sender.send('section-1-got-app-path', app.getAppPath())
})
