<template>
  <div class="top-container">
    <div
      class="main-container"
      :class="{ 'blur-overlay': noSavedConnections }"
    >
      <div class="navbar-fixed">
        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">Logo</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <a class="waves-effect waves-light btn">button</a>
              </li>

            </ul>
          </div>
        </nav>
      </div>


      <div class="container">
        <!-- Page Content goes here -->
      </div>
    </div>

    <addConnection
      :shouldOpen="noSavedConnections"
    />
  </div>
</template>

<script>
/** @flow */
import * as configs from '../configs'
import { REDIS_CONNECTION_ERROR, REDIS_CONNECTION_SUCCESS } from '../channels_constants'
import { Data } from './App.types'
import Database from './services/indexedDB'
import { eventBus } from './main'
// Components
import AddConnection from './components/modals/AddConnection.vue'

export default {
  name: 'app',

  components: {
    AddConnection
  },

  data(): Data {
    return {
      connected: false,
      savedConnections: 0,
      redisConnected: false,
      redisConnectionError: null
    }
  },

  computed: {
    noSavedConnections () {
      return this.savedConnections === 0
    }
  },

  // lifecycle
  created() {
    const { ipcRenderer } = this.$electron;

    eventBus.$once('connection:established', () => {
      // TODO retrieve saved connections count
      this.savedConnections = 1
    })

    ipcRenderer.send('process:ui.ready')

    const database = new Database(configs.localDatabaseName, 1)

    database.getConnectionsCount().then((count:number) => {
      this.savedConnections = count

      if (count === 0) {
        eventBus.$emit('no-saved-connections')
      }
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
