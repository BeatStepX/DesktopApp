import { BrowserWindow, globalShortcut, dialog, protocol, app } from 'electron';
import * as path from 'path';
import { Test } from './test';
// const path = require('path');
const browserOptions = {
  width: 1360,
  height: 768,
  title: 'BeatStepX',
  fullscreen: true,
  autoHideMenuBar: true,
  icon: 'icon_128.png',
  // frame: false,
  webPreferences: {
    nodeIntegration: false,
    // allowDisplayingInsecureContent: true,
    // allowRunningInsecureContent: true,
    // webSecurity: false
  }
};
console.log("Test Console.log");

const basePath = __dirname + '\\..\\public\\';

class Main {
  mainWindow: BrowserWindow;
  test: Test;
  constructor() {
    this.test = new Test();
    app.on('ready', this.createWindow.bind(this));
    
    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
    
    app.on('activate', this.onActive.bind(this));
    
  }

  onActive() {
    if (this.mainWindow === null) {
      this.createWindow();
    }
  }

  createWindow () {
    protocol.registerFileProtocol('atom', (request: any, callback: any) => {
      let url = request.url.substr(7);
      url = url === "" ? "index.html" : url;
      
      const newPath = path.normalize(basePath + url);

      callback({path: newPath});
    }, (error: any) => {
      if (error) {
        console.error('Failed to register protocol');
      }
    });
    // Create the browser window.
    this.mainWindow = new BrowserWindow(browserOptions);
    this.mainWindow.maximize();
    // mainWindow.setMenu(null);
    const f11 = globalShortcut.register('PrintScreen', () => {
      this.mainWindow.webContents.toggleDevTools();
    });
  
    if (!f11) {
      dialog.showErrorBox('Global Shortcut', 'F11 registration failed.');
    }
    // and load the index.html of the app.
    this.mainWindow.loadURL('atom://');
    
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    this.mainWindow.webContents.on('new-window', (event) => {
      event.preventDefault();
    });
    // Emitted when the window is closed.
    this.mainWindow.on('closed', this.onClose.bind(this)); 
  }
  private onClose() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    this.mainWindow = null;
  }
}

const main = new Main();
