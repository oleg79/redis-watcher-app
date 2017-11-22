<template>
  <b-list-group flush>
    <b-list-group-item
      v-for="setKey in keysSet"
      key="key"
      @click="getKeyValue(setKey)"
    >
      {{ setKey }}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapState(['keysSet'])
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

</style>
