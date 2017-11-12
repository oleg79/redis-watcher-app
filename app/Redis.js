const os = require('os');
const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class Redis {
  constructor (ipcRenderer, options = []) {
    this.ipcRenderer = ipcRenderer;
    this.client = redis.createClient(options);

    this.client.on('error', this.handleClientError.bind(this));
    // this.ipcRenderer.send('received:databases.info', this.getDatabases());
  }

  async get (key) {
    return this.client.getAsync(key);
  }

  async getDatabases () {
    let output = [];
    try {
      const raw = await this.client.infoAsync('keyspace');
      // console.log(this.parseKeyspaceInfo(raw));
      output = this.parseKeyspaceInfo(raw);
    } catch (e) {
      // console.log(e);
    }
    return output;
  }

  handleClientError (error) {
    this.ipcRenderer.send('error:redis.client', error);
    this.client.quit();
  }

  parseKeyspaceInfo (raw) {
    return raw.split(os.EOL).splice(1)
      .filter(line => line.length)
      .map(line => line.replace('\r', ''))
      .map(line => line.split(':'))
      .map(([name, rawPairs]) => Object.assign({ name }, this.parsePairsToMap(rawPairs.split(','))));
  }

  parsePairsToMap (rawPairs, separator = '=') {
    return rawPairs.reduce((acc, curr) => {
      const [key, val] = curr.split(separator);
      acc[key] = val;
      return acc;
    }, {});
  }
}

module.exports = Redis;
