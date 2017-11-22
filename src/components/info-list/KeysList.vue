<template>
  <b-list-group flush v-if="keysSet && keysSet.length">
    <b-list-group-item
      v-for="setKey in keysSet"
      key="key"
      @click="getKeyValue(setKey)"
      :class="{ active: setKey === currentKey }"
    >
      {{ setKey }}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapState(['keysSet', 'currentKey'])
    },

    methods: {
      ...mapMutations(['setKey']),
      getKeyValue(key) {
        this.setKey(key)
        this.$electron.ipcRenderer.send('redis.key:get.value', key)
      }
    }
  }
</script>

<style lang="sass">
  .active
    background: #ababab
</style>
