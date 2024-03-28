import { app, BrowserWindow } from 'electron';

let mainWindow;
app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });


  mainWindow.loadURL('http://localhost:5173/');
  //mainWindow.loadFile('dist/index.html');

  // openbs devTools
  mainWindow.webContents.openDevTools();
});