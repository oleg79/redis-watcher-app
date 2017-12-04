<template>
  <div
    class="statusbar"
    v-show="connected"
  >
    <div class="menu-toggle">
      <a @click.prevent="toggleMenu" style="height: 40px;">
        <icon
          v-if="isMenuOpened"
          name="times"
          scale="1.5"
        />
        <icon
          v-else
          name="bars"
          scale="1.5"
        />
      </a>
    </div>

    <div
      class="current current-connection"
      v-if="currentConnection"
    >
      <b-badge variant="primary">CONNECTION :</b-badge>
      <b-badge variant="light">{{ `${currentConnection.host}:${currentConnection.port}` }}</b-badge>
    </div>

    <div
      class="current current-database"
      v-if="currentDatabase"
    >
      <b-badge variant="primary">DATABASE :</b-badge>
      <b-badge variant="light">{{ currentDatabase.name }}</b-badge>
    </div>

    <div
      class="current current-key"
      v-if="currentKey"
    >
      <b-badge variant="primary">KEY :</b-badge>
      <b-badge variant="light">{{ currentKey }}</b-badge>
    </div>

    <div
      class="current current-key-ttl"
      v-if="currentKeyTTL"
    >
      <b-badge variant="warning">TTL :</b-badge>
      <b-badge
        variant="light"
        v-dynamic-ttl="currentKeyTTL"
      >{{ currentKeyTTL }}
      </b-badge>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import DynamicTTL from '../../directives/DynamicTTL'

  export default {
    directives: {
      'dynamic-ttl': DynamicTTL
    },

    data() {
      return {
        selectedDatabase: null
      }
    },

    computed: {
      ...mapState([
        'currentConnection',
        'currentDatabase',
        'currentKey',
        'currentKeyTTL',
        'connected',
      ]),
      ...mapGetters(['isMenuOpened']),
    },

    methods: {
      ...mapMutations(['toggleMenu'])
    },

  }
</script>

<style lang="sass">
  .statusbar
    display: flex
    justify-content: flex-start
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 50px
    background: #2c2e31
    color: #fff

  .menu-toggle
    order: 0
    height: 50px
    width: 50px
    display: block
    padding: 14px
    cursor: pointer

  .current
    padding-top: 13px
    margin-right: 10px

    &-connection
      order: 1

    &-database
      order: 2

    &-key
      order: 3

    &-key-ttl
      order: 4

</style>
