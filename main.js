const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Initialize store
const store = new Store({
  defaults: {
    todos: [],
    windowBounds: { width: 350, height: 500, x: 0, y: 0 }
  }
});

let mainWindow;

function createWindow() {
  const { width, height, x, y } = store.get('windowBounds');
  
  // Create the browser window with transparent background
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: x,
    y: y,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'icon.png')
  });

  // Load the index.html file
  mainWindow.loadFile('index.html');

  // Save window position and size on close
  mainWindow.on('close', () => {
    const bounds = mainWindow.getBounds();
    store.set('windowBounds', {
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y
    });
  });

  // Handle close button from renderer
  ipcMain.on('close-app', () => {
    app.quit();
  });

  // Handle minimize button from renderer
  ipcMain.on('minimize-app', () => {
    mainWindow.minimize();
  });
}

// Create window when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for todo operations
ipcMain.handle('get-todos', () => {
  return store.get('todos');
});

ipcMain.handle('save-todos', (event, todos) => {
  store.set('todos', todos);
  return true;
});
