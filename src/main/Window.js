import { BrowserWindow, app } from 'electron'
import path from 'path'
export default class Window {
  constructor (name, isDevMode, args) {
    this.name = name
    this.isDevMode = isDevMode
    this.setBrowserWindow(args)
  }
  setBrowserWindow (args) {
    const webPreferences = {
      nodeIntegration: false,
      contextIsolation: false,
      webviewTag: false,
      preload: path.join(app.getAppPath(), 'out/renderer/preload.js'),
      enableRemoteModule: true
    }
    this.browserWindow = new BrowserWindow({
      ...args,
      webPreferences
    })
    if (process.platform !== 'darwin') {
      this.browserWindow.setMenu(null)
    }
    if (this.isDevMode === true) {
      this.browserWindow.webContents.openDevTools()
    }
    this.browserWindow.on('closed', (...arg) =>
      this.onClosed(...arg, this.name)
    )
    this.browserWindow.webContents.on('new-window', e => {
      e.preventDefault()
    })
    this.browserWindow.webContents.on('will-navigate', e => {
      e.preventDefault()
    })
  }
  loadFile (fname) {
    this.browserWindow.loadFile(fname)
  }
  loadURL (url) {
    this.browserWindow.loadURL(url)
  }
  show () {
    this.browserWindow.show()
    this.browserWindow.focus()
  }
  setSize (w, h) {
    this.browserWindow.setSize(w, h)
  }
}
