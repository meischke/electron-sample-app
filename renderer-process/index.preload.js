const { ipcRenderer, contextBridge } = require("electron");
const glob = require('glob')

contextBridge.exposeInMainWorld("myAPI", {
  globSync: (...args) => glob.sync(...args),
  ipcSend: (...args) => ipcRenderer.send(...args),
  ipcOn: (key, handler) =>
    ipcRenderer.on(key, (event, ...args) => handler(event, ...args)),
})
