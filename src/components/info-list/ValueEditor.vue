<template>
  <div class="hierarchy" style="background: #fff" v-if="keyValue">
    <ValueResolver
      :value="keyValue"
    />
  </div>

</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import DataHierarchy from './DataHierarchy.vue'
  import ValueResolver from '../hierarchy/ValueResolver.vue'

  export default {
    components: {
      DataHierarchy,
      ValueResolver
    },
    methods: {
      ...mapMutations([
        'setKeyValue',
        'setKeyTTL'
      ])
    },

    computed: {
      ...mapState(['keyValue'])
    },

    created() {
      this.$electron.ipcRenderer.on('redis.key:receive.value', (event, { TTL, parsedValue }:Object) => {
        this.setKeyValue(parsedValue)
        this.setKeyTTL(TTL)
      })
    }
  }
</script>

<style lang="sass">
  .hierarchy > ul
    padding: 0
</style>
