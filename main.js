const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const Redis = require('./lib/redis')

let mainWindow
let redisClient

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('app.exit', () => {
  mainWindow.close()
})

ipcMain.on('process:ui.ready', async (event) => {
  redisClient = new Redis(event.sender)
  const data = await redisClient.getDatabases()
  event.sender.send('received:databases.info', data)
})

ipcMain.on('connection:establish', (event, data) => {
  console.info(data)
})

// ipcMain.on('test.ping', async (event, key) => {
//   // event.sender.send('test.pong', await getValue(key));
// });
