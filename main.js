/* eslint-disable */
const electron = require('electron')
const { serialize } = require('php-serialize')
const phpUnserialize = require('phpunserialize')
const { Base64 } = require('js-base64')
const zlib = require('zlib')
const fs = require('fs')
const { Writable, Readable, Stream } = require('stream')
const path = require('path')
const url = require('url')
const Redis = require('./lib/redis')

const { app, BrowserWindow, ipcMain } = electron

let mainWindow
let redisClient
let focused

const createWindow = () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 1200,
    minHeight: 700,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()

  mainWindow.on('focus', () => {
    focused = true
  })

  mainWindow.on('blur', () => {
    focused = false
  })

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
  let rawValue
  let parsedValue
  try {
    rawValue = await redisClient.getSetValue(key)
  } catch (e) {
    rawValue = null
  }

  try {
    parsedValue = JSON.parse(rawValue)
  } catch (e) {
    parsedValue = null
  }

  if (parsedValue === null) {
    try {
      parsedValue = phpUnserialize(rawValue)
    } catch (e) {
      parsedValue = null
    }
  }

  if (parsedValue === null) {
    try {
      const output = zlib.createGunzip()
    } catch (e) {
      parsedValue = null
    }
  }

  event.sender.send('redis.key:receive.value', parsedValue)
})

ipcMain.on('redis.key:update', async (event, { key, value }) => {
  try {
    const result = await redisClient.setValue(key, serialize(value))
    console.log(result)
  } catch (e) {
    //
  }
})
