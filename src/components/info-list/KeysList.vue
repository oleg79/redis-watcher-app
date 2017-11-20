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
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['keysSet'])
    },

    methods: {
      getKeyValue(key) {
        this.$electron.ipcRenderer.send('redis.key:get.value', key)
      }
    }
  }
</script>

<style lang="sass">

</style>
