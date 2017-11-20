<template>
  <tree-view
    v-if="keyValue"
    :data="keyValue"
    :options="{maxDepth: 7}"
    style="background: #fff"
  >
  </tree-view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapMutations(['setKeyValue'])
    },

    computed: {
      ...mapState(['keyValue'])
    },

    created() {
      this.$electron.ipcRenderer.on('redis.key:receive.value', (event, value:any) => {
        this.setKeyValue(value)
      })
    }
  }
</script>

<style lang="sass">

</style>
