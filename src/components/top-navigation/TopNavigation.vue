<template>
  <b-navbar
    sticky
    v-show="connected"
  >
    <b-nav>
      <b-nav-item-dropdown text="Connections">
        <b-dropdown-item
          href="#"
          v-for="connection in redisConnections"
          key="connection.id"
        >
          <div>{{ `${connection.host}:${connection.port}` }}</div>
        </b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="Databases">
        <b-dropdown-item
          href="#"
          v-for="database in databases"
          key="database.name"
          @click="selectDatabase(database)"
        >
          <div>
            name: {{ database.name }} | keys: <b-badge pill variant="info">{{ database.keys }}</b-badge>
          </div>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        selectedDatabase: null
      }
    },

    computed: {
      ...mapState([
        'connected',
        'databases',
        'redisConnections'
      ])
    },

    methods: {
      ...mapMutations([
        'setDatabases',
        'setCurrentDatabase',
        'setKeysSet'
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

<style lang="sass">

</style>
