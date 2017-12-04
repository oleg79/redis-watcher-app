<template>
  <transition
    name="menu-transition"
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutLeft"
  >
    <div class="left-side-menu" v-show="menu.isOpened">
      <h3 class="text-center">Menu</h3>

      <div class="menu-container">

        <div class="menu-item">
          <b-dropdown
            id="_connections"
            text="Available connections"
            class="m-md-2 menu-item-button"
          >
            <slot name="button-content">
              <a class="menu-item-button">Available connections</a>
            </slot>
            <b-dropdown-item
              v-for="connection in redisConnections"
              :key="connection.host"
            >
              {{ connection.host }}: {{ connection.port }}
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div class="menu-item">
          <b-dropdown
            id="_databases"
            text="Available databases"
            class="m-md-2 menu-item-button"
          >
            <b-dropdown-item
              v-for="database in databases"
              :key="database.name"
              @click="selectDatabase(database)"
            >
              {{ database.name }}: {{ database.keys }}
            </b-dropdown-item>
          </b-dropdown>
        </div>

      </div>
    </div>
  </transition>
</template>

<script language="javascript">
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        selectedDatabase: null
      }
    },

    computed: {
      ...mapState([
        'menu',
        'currentConnection',
        'currentDatabase',
        'currentKey',
        'databases',
        'redisConnections'
      ]),

      selectedConnection() {
        return this.redisConnectionsOptions[0]
      }
    },

    methods: {
      ...mapMutations([
        'setDatabases',
        'setCurrentDatabase',
        'setKeysSet',
        'toggleMenu'
      ]),
      selectDatabase(database:Object) {
        this.$electron.ipcRenderer.send('redis.database:select', database.name)
        this.selectedDatabase = database
      }
    },

    created() {
      const { ipcRenderer } = this.$electron

      ipcRenderer.on('redis.databases:info', (event:Object, data:Array<Object>) => {
        this.setDatabases(data)
      })

      ipcRenderer.on('redis.database:selected', (event:Object, data:Array<string>) => {
        this.setCurrentDatabase(this.selectedDatabase)
        this.setKeysSet(data)
      })
    }
  }
</script>

<style lang="sass" scoped>
  .left-side-menu
    width: 300px
    height: calc(100% - 50px)
    position: fixed
    z-index: 99999
    left: 0
    top: 50px
    background: #2c2e31
    border-top: 4px solid #0E4749
    color: #fff

  .menu-container
    padding: 14px

  .menu-item-button
    background: none
    border: none




</style>
