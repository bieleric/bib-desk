import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { setupDatabase } from './database.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

setupDatabase();

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL('http://localhost:5173/');
  //mainWindow.loadFile('dist/index.html');

  // opens devTools
  mainWindow.webContents.openDevTools();
});


