<template>
  <b-modal
    ref="startModal"
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
  >
    <component :is="contentComponent"></component>
  </b-modal>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as configs from '../../../configs'
  import Database from '../../services/indexedDB'
  import { eventBus } from '../../main'
  import { REDIS_CONNECTION_ERROR, REDIS_CONNECTION_SUCCESS } from'../../../channels_constants'
  import AddConnection from './AddConnection.vue'
  import SelectConnection from './SelectConnection.vue'

  export default {
    components: {
      AddConnection,
      SelectConnection
    },

    computed: {
      ...mapGetters([
        'savedConnectionsCount'
      ]),

      contentComponent() {
        return this.savedConnectionsCount
          ? 'SelectConnection'
          : 'AddConnection'
      }
    },

    methods: mapMutations([
      'setConnections',
      'setRedisError',
      'setConnected'
    ]),

    // lifecycle
    created() {
      const database = new Database(configs.localDatabaseName, 1)

      database.getConnections().then((connections:Array<Object>) => {
        if (connections.length) {
          this.setConnections(connections)
        }

        this.$refs.startModal.show()
      })

      const { ipcRenderer } = this.$electron;

      ipcRenderer.on(REDIS_CONNECTION_ERROR, (_, error) => {
        this.setRedisError(error)
      })

      ipcRenderer.on(REDIS_CONNECTION_SUCCESS, () => {
        this.setConnected(true)
        this.$refs.startModal.hide()
      })

    }
  }
</script>

<style lang="sass">
  .modal-dialog
    margin: 0 auto
    top: 50%
    transform: translateY(-50%) !important
</style>
