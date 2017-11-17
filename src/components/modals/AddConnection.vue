<template>
  <modal name="no-saved-connections" class="add-connection">
    <div class="modal-content">
      <div class="row">
        <form class="col s12">
          <div class="row add-connection-row">
            <div class="input-field col s6 offset-s3">
              <input
                id="redis_host"
                type="text"
                class="validate"
                v-model="newConnection.host"
              >
              <label class="active" for="redis_host">Host</label>
            </div>
          </div>

          <div class="row add-connection-row">
            <div class="input-field col s6 offset-s3">
              <input
                id="redis_port"
                type="text"
                class="validate"
                v-model="newConnection.port"
              >
              <label class="active" for="redis_port">Port</label>
            </div>
          </div>

          <div class="row add-connection-row">
            <div class="input-field col s6 offset-s3">
              <input
                id="redis_password"
                type="password"
                class="validate"
                v-model="newConnection.password"
              >
              <label class="active" for="redis_password">Password</label>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <div class="row add-connection-row">
        <div class="col s6 offset-s3 center-align">
          <a
            class="waves-effect waves-light btn"
            @click="addConnection"
          >add</a>
          <a
            class="waves-effect waves-light btn red"
            @click="exitApp"
          >exit</a>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
  import * as configs from '../../../configs'
  import Database from '../../services/database'
  import { eventBus } from '../../main'

  export default {
    data() {
      return {
        newConnection: {
          host: null,
          port: null,
          password: null,
        },
        database: null
      }
    },
    methods: {
      exitApp() {
        this.$electron.ipcRenderer.send('app.exit')
      },
      addConnection() {
        // TODO: add validation
        this.database.addConnection(this.newConnection)
          .then(() => {
            this.$modal.hide('no-saved-connections')
            this.$electron.ipcRenderer.send('connection:establish', this.newConnection)
            eventBus.$emit('connection:established')
          })
          .catch(e => console.log(e))
      }
    },
    created() {
      eventBus.$once('no-saved-connections', () => {
        this.database = new Database(configs.localDatabaseName, 1)
        this.$modal.show('no-saved-connections')
      })
    }
  }
</script>

<style lang="sass">

</style>
