const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  ipcSend: (...args) => ipcRenderer.send(...args),
  ipcOn: (key, handler) =>
    ipcRenderer.on(key, (event, ...args) => handler(event, ...args)),
});
