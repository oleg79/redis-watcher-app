<template>
  <!--<tree-view-->
    <!--v-if="keyValue"-->
    <!--:data="keyValue"-->
    <!--:options="{maxDepth: 7}"-->
    <!--style="background: #fff"-->
  <!--&gt;-->
  <!--</tree-view>-->
  <div class="hierarchy" style="background: #fff">
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
  .hierarchy > ul
    padding: 0
</style>
