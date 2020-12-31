// Modules to control application life and create native browser window
const path = require('path')
const glob = require('glob')
const { app, BrowserWindow } = require("electron");

let mainWindow = null;

function initialize() {

  makeSingleInstance()

  loadMainFiles()

  // Create the browser window.
  function createWindow() {
    const windowOptions = {
      width: 1024,
      minWidth: 800,
      height: 768,
      minHeight: 600,
      title: app.getName(),
      webPreferences: {
        //enableRemoteModule: false, // Deprecated
        //nodeIntegration: false, // Deprecated
        contextIsolation: true,
        preload: path.join(__dirname, "/renderer-process/index.preload.js")
      },
    };
    mainWindow = new BrowserWindow(windowOptions);
    // and load the index.html of the app.
    mainWindow.loadFile("index.html");
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(createWindow);

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q. 
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  if (process.mas) return;

  if(!app.requestSingleInstanceLock()){
    app.quit()
  }
  else {
    app.on("second-instance", () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    })
  }
}

// Require each JS file in the main-process dir
function loadMainFiles() {
  const files = glob.sync(path.join(__dirname, "main-process/**/*.js"));
  files.forEach((file) => {
    require(file);
  });
}

initialize();

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
