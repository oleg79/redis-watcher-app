const { app, BrowserWindow, ipcMain } = require('electron')
// const { unserialize } = require('php-serialization')
const phpUnserialize = require('phpunserialize')
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

ipcMain.on('connection:try.establish', async (event, connectionOptions) => {
  redisClient = new Redis(connectionOptions, event.sender)

  const databases = await redisClient.getDatabases()
  event.sender.send('redis.databases:info', databases)
})

ipcMain.on('redis.database:select', async (event, databaseName) => {
  const keys = await redisClient.getKeys(databaseName)
  event.sender.send('redis.database:selected', keys)
})

ipcMain.on('redis.key:get.value', async (event, key) => {
  try {
    const value = await redisClient.getSetValue(key)
    event.sender.send('redis.key:receive.value', phpUnserialize(value))
  } catch (e) {
    //
  }
})
