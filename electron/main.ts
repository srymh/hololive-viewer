import {app, BrowserWindow, ipcMain, Menu} from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import * as ConfigStore from './ConfigStore';
import {isChannel} from '../src/types';
import createMenu from './menu';

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const menu = createMenu(() => {
    win?.webContents.send('APP_ShowConfig', true);
  });
  win.setMenu(menu);
  Menu.setApplicationMenu(menu);

  win.webContents.openDevTools();
  if (isDev) {
    win.loadURL('http://localhost:3000/index.html');
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on('closed', () => (win = null));

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(
        __dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        'electron'
      ),
      forceHardReset: true,
      hardResetMethod: 'exit',
    });
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.handle('APP_SetChannel', (event, message) => {
  if (isChannel(message)) {
    ConfigStore.setChannel(message);
    return true;
  }
  return false;
});

ipcMain.handle('APP_GetChannels', (event, message) => {
  return ConfigStore.getChannels();
});

ipcMain.handle('APP_RemoveChannel', (event, message) => {
  if (typeof message === 'string') {
    ConfigStore.removeChannel(message);
    return true;
  }
  return false;
});
