const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class Redis {
  constructor(ipcRenderer, options = []) {
    this.ipcRenderer = ipcRenderer;
    this.client = redis.createClient(options);

    this.client.on('error', this.handleClientError.bind(this));
  }

  async get(key) {
    return this.client.getAsync(key);
  }

  handleClientError(error) {
    this.ipcRenderer.send('error:redis.client', error);
    this.client.quit();
  }
}

module.exports = Redis;
