import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { setupDatabase } from './database.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  if(process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173/');

    // opens devTools
    mainWindow.webContents.openDevTools();
  }
  else {
    mainWindow.loadFile('dist/vue/index.html');
  }
}

app.whenReady().then(() => {
  setupDatabase();
  createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});


