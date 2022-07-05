import { BrowserWindow } from "electron"
import { resolve } from "path"

export default function CreateWindow() {
  const win = new BrowserWindow({
    width: 250,
    height: 310,
    show: false,
    frame: false,
    resizable: true,
    fullscreenable: false,
    webPreferences: {
      preload: resolve(__dirname, "preload.js"),
    },
  })

  win.loadFile(resolve(__dirname, '../', '../', 'public', 'index.html'))
  win.webContents.openDevTools()
  return win
}

