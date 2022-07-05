import { BrowserWindow } from 'electron';
import { resolve } from 'path';

export default function CreateWindow() {
  const win = new BrowserWindow({
    width: 350,
    height: 410,
    show: false,
    frame: false,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: resolve(__dirname, 'preload.js'),
    },
  });

  win.loadFile(resolve(__dirname, '../', '../', 'public', 'index.html'));
  //win.webContents.openDevTools();
  return win;
}
