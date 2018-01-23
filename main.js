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
const { createError, createInfo, createSuccess } = require('./app/notificationCreator')

const { app, BrowserWindow, ipcMain, Menu } = electron

let mainWindow
let redisClient
let focused

const template = [
  {
    label: 'options',
    submenu: []
  },
  {
    label: 'info',
    submenu: []
  },
]

const createWindow = () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 1200,
    minHeight: 700,
    icon: path.join(__dirname, 'assets/icons/png/96x96.png')
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // mainWindow.webContents.openDevTools()

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

  const menu = Menu.buildFromTemplate(template)

  Menu.setApplicationMenu(menu)
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
      event.sender.send(
        'app.error',
        createError('redis.parse.value.error', {
          key
        })
      )
    }
  }

  let TTL
  try {
    TTL = await redisClient.getKeyTTL(key)
  } catch (e) {
    TTL = null
  }

  event.sender.send('redis.key:receive.value', { TTL, parsedValue })
})

ipcMain.on('redis.key:update', async (event, { key, value }) => {
  try {
    const result = await redisClient.setValue(key, serialize(value))
    if (result === 'OK') {
      event.sender.send(
        'app.success',
        createSuccess('redis.update.key.success', {
          key,
          value
        })
      )
    }
  } catch (e) {
    event.sender.send(
      'app.error',
      createError('redis.update.key.error', {})
    )
  }
})

ipcMain.on('redis.pubsub:subscribe', (event, channelName) => {
  redisClient.subscribe(channelName, (channel, message) => {
    event.sender.send('app.info', createInfo('redis.pubsub.message', {
      channel,
      message
    }))
  })
})

ipcMain.on('redis.pubsub:unsubscribe', (event, channelName) => {
  redisClient.unsubscribe(channelName, (channel, message) => {
    event.sender.send('app.info', createInfo('redis.pubsub.message', {
      channel,
      message
    }))
  })
})


