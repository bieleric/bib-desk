const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', {
    invoke: (event, ...args) => ipcRenderer.invoke(event, ...args),
});