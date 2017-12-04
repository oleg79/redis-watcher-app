<template>
  <transition
    name="menu-transition"
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutLeft"
  >
    <div class="left-side-menu" v-show="menu.isOpened">
      <h3 class="text-center">{{ $formatMessage({ id: 'menu.title' }) }}</h3>

      <div class="menu-container">

        <div class="menu-item">
          <b-dropdown
            id="_connections"
            :text="$formatMessage({ id: 'available.connections' })"
            class="m-md-2 menu-item-button"
          >
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
            :text="$formatMessage({ id: 'available.databases' })"
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

        <div class="menu-item">
          <h5 class="text-center">{{ $formatMessage({ id: 'subscribers.list' }) }}</h5>
          <div>
            <form @submit.prevent="addSubscriber">
              <input
                type="text"
                placeholder="добавить подписчика"
                class="add-subscribers"
                v-model="newSubscriber"
              >
            </form>
          </div>
          <div class="subscribers-list">
            <ul>
              <li
                v-for="(subscriber, index) in subscribers"
                :key="index"
              >
                <span>{{ subscriber }}</span>
                <b-btn variant="outline-danger" @click="deleteSubscriber(index)">
                  <icon
                    name="trash-o"
                    scale="1"
                  ></icon>
                </b-btn>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script language="javascript">
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import Subscriber from '../subscriber/Subscriber'

  export default {
    components: {
      Subscriber
    },

    data() {
      return {
        selectedDatabase: null,
        newSubscriber: ''
      }
    },

    computed: {
      ...mapState([
        'menu',
        'currentConnection',
        'currentDatabase',
        'currentKey',
        'databases',
        'redisConnections',
        'subscribers'
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
        'toggleMenu',
        'pushSubscriber',
        'removeSubscriber'
      ]),
      selectDatabase(database:Object) {
        this.$electron.ipcRenderer.send('redis.database:select', database.name)
        this.selectedDatabase = database
      },
      deleteSubscriber(index:number) {
        this.removeSubscriber(index)
        this.$electron.ipcRenderer.send('redis.pubsub:unsubscribe', this.subscribers[ index ])
      },
      addSubscriber() {
        const trimmed = this.newSubscriber.replace(' ', '')
        if (trimmed.length && this.subscribers.indexOf(trimmed) === -1) {
          this.pushSubscriber(trimmed)
          this.$electron.ipcRenderer.send('redis.pubsub:subscribe', trimmed)
          this.newSubscriber = ''
        }
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

  .add-subscribers
    margin-left: 8px

  .subscribers-list
    ul
      list-style: none
      padding: 0
      margin-left: 8px

      li
        overflow: hidden
        margin-bottom: 10px

        button
          float: right

        span
          line-height: 2.5em
</style>
