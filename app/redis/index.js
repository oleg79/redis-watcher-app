/** @flow */
/* $FlowFixMe */
const os = require('os')
/* $FlowFixMe */
const redis = require('redis')
/* $FlowFixMe */
const bluebird = require('bluebird')
const { REDIS_CONNECTION_ERROR, REDIS_CONNECTION_SUCCESS } = require('../../channels_constants')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

class Redis {
  ipcRenderer:Object
  client: any

  constructor (options:Object = {}, ipcRenderer: Object) {
    this.client = redis.createClient(options)
    this.ipcRenderer = ipcRenderer

    this.client.on('error', this.handleClientError.bind(this))
    this.client.on('connect', this.handleClientConnect.bind(this))
  }

  // instance methods
  handleClientError (error:Object) {
    this.ipcRenderer.send(REDIS_CONNECTION_ERROR, error)
    this.client.quit()
  }

  handleClientConnect () {
    this.ipcRenderer.send(REDIS_CONNECTION_SUCCESS)
  }

  // async methods
  async getDatabases () {
    let output = []
    try {
      const raw = await this.client.infoAsync('keyspace')
      output = Redis.parseKeyspaceInfo(raw)
    } catch (e) {
      // console.log(e);
    }
    return output
  }

  async getKeys (databaseName:string) {
    try {
      const status = await this.client.selectAsync(Redis.getDbNumberFromName(databaseName))
      if (status === 'OK') {
        const keys = await this.client.keysAsync('*')
        return keys
      }
      return []
    } catch (e) {
      return []
    }
  }

  async getSetValue (key:string) {
    try {
      const value = this.client.getAsync(key)
      return value
    } catch (e) {
      return null
    }
  }

  async setValue (key:string, value:any) {
    try {
      const result = this.client.setAsync(key, value)
      return result
    } catch (e) {
      return null
    }
  }

  // static methods
  static parseKeyspaceInfo (raw:string) {
    return raw.split(os.EOL).splice(1)
      .filter(line => line.length)
      .map(line => line.replace('\r', ''))
      .map(line => line.split(':'))
      .map(([name, rawPairs]) => Object.assign({ name }, Redis.parsePairsToMap(rawPairs.split(','))))
  }

  static parsePairsToMap (rawPairs:Array<string>, separator:string = '=') {
    return rawPairs.reduce((acc, curr) => {
      const [key, val] = curr.split(separator)
      acc[key] = val
      return acc
    }, {})
  }

  static getDbNumberFromName (name:string): number {
    return Number(name.substr(2))
  }
}

module.exports = Redis;
