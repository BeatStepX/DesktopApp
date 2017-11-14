"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const test_1 = require("./test");
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
    }
};
const basePath = __dirname + '\\..\\public\\';
class Main {
    constructor() {
        this.test = new test_1.Test();
        electron_1.app.on('ready', this.createWindow.bind(this));
        // Quit when all windows are closed.
        electron_1.app.on('window-all-closed', () => {
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                electron_1.app.quit();
            }
        });
        electron_1.app.on('activate', this.onActive.bind(this));
    }
    onActive() {
        if (this.mainWindow === null) {
            this.createWindow();
        }
    }
    createWindow() {
        console.log("Debug console");
        electron_1.protocol.registerFileProtocol('atom', (request, callback) => {
            // const url = request.url.substr(7).slice(0, -1);
            let url = request.url.substr(7);
            url = url === "" ? "index.html" : url;
            const newPath = path.normalize(basePath + url);
            // const newPath = path.normalize(__dirname + basePath + url);
            callback({ path: newPath });
        }, (error) => {
            if (error) {
                console.error('Failed to register protocol');
            }
        });
        // Create the browser window.
        this.mainWindow = new electron_1.BrowserWindow(browserOptions);
        this.mainWindow.maximize();
        // mainWindow.setMenu(null);
        const f11 = electron_1.globalShortcut.register('PrintScreen', () => {
            this.mainWindow.webContents.toggleDevTools();
        });
        if (!f11) {
            electron_1.dialog.showErrorBox('Global Shortcut', 'F11 registration failed.');
        }
        // and load the index.html of the app.
        // this.mainWindow.loadURL('atom://' + basePath + 'index.html');
        this.mainWindow.loadURL('atom://');
        // mainWindow.loadURL('http://html5test.com/');
        // Open the DevTools.
        // mainWindow.webContents.openDevTools();
        this.mainWindow.webContents.on('new-window', (event) => {
            event.preventDefault();
        });
        // Emitted when the window is closed.
        this.mainWindow.on('closed', this.onClose.bind(this));
    }
    onClose() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        this.mainWindow = null;
    }
}
const main = new Main();

//# sourceMappingURL=main.js.map
