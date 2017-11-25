"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const electron_1 = require("electron");
const browserOptions = {
    width: 800,
    height: 600,
    title: 'BeatStepX',
    fullscreen: true,
    autoHideMenuBar: true,
    icon: 'build/icon.ico',
    show: false,
    // frame: false,
    webPreferences: {}
};
console.log("Test Console.log");
electron_1.app.commandLine.appendSwitch('use-gl', 'desktop');
const basePath = __dirname + '\\..\\public\\';
class Main {
    constructor() {
        const shouldQuit = electron_1.app.makeSingleInstance(this.onNewWindow.bind(this));
        if (shouldQuit) {
            electron_1.app.quit();
            return;
        }
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
    onNewWindow(commandLine, workingDirectory) {
        console.log(commandLine, workingDirectory);
        // Someone tried to run a second instance, we should focus our window.
        if (this.mainWindow) {
            if (this.mainWindow.isMinimized())
                this.mainWindow.restore();
            this.mainWindow.focus();
        }
    }
    onActive() {
        if (this.mainWindow === null) {
            this.createWindow();
        }
    }
    createWindow() {
        const size = electron_1.screen.getPrimaryDisplay().workAreaSize;
        console.log(size, size.width, size.height);
        browserOptions.width = size.width;
        browserOptions.height = size.height;
        electron_1.protocol.registerFileProtocol('atom', (request, callback) => {
            let url = request.url.substr(7);
            url = url === "" ? "index.html" : url;
            const newPath = path.normalize(basePath + url);
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
        this.mainWindow.loadURL('atom://');
        // Open the DevTools.
        // mainWindow.webContents.openDevTools();
        this.mainWindow.webContents.on('new-window', (event) => {
            event.preventDefault();
        });
        this.mainWindow.webContents.on('did-finish-load', this.onFinishLoad.bind(this));
        // Emitted when the window is closed.
        this.mainWindow.on('closed', this.onClose.bind(this));
    }
    onFinishLoad() {
        this.mainWindow.show();
        this.mainWindow.focus();
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
