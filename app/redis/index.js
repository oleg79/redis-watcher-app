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

  constructor (ipcRenderer: Object, options:Array<string> = []) {
    this.ipcRenderer = ipcRenderer
    this.client = redis.createClient(options)

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

  async get (key:string) {
    return this.client.getAsync(key)
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
}

module.exports = Redis;
