<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header mdl-layout__header--waterfall main-header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">Title</span>
        <span v-if="redisConnectionError">{{ redisConnectionError }}</span>
        <span v-if="redisConnected">Connection had been established!</span>
        <span>Saved connections: {{ savedConnections }}</span>
      </div>
    </header>
  </div>
</template>

<script>
/** @flow */
import { localDatabaseName } from '../configs'
import { REDIS_CONNECTION_ERROR, REDIS_CONNECTION_SUCCESS } from '../channels_constants'
import { Data } from './App.types'
import Database from './services/database'

export default {
  name: 'app',

  data(): Data {
    return {
      connected: false,
      savedConnections: 0,
      redisConnected: false,
      redisConnectionError: null
    }
  },

  mounted() {
    const { ipcRenderer } = this.$electron;
    ipcRenderer.send('process:ui.ready');

    const database = new Database(localDatabaseName, 1)

    database.getConnectionsCount().then((count:number) => {
      this.savedConnections = count
    })

    ipcRenderer.on(REDIS_CONNECTION_ERROR, (event: any, error: Object) => {
      this.redisConnectionError = error
    })

    ipcRenderer.on(REDIS_CONNECTION_SUCCESS, () => {
      this.redisConnected = true
    })
  }
};
</script>

<style lang="sass" scoped>

</style>
