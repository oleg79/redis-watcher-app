<template>
  <div class="keys-list-container" v-if="keysSet && keysSet.length">
    <div class="input-group keys-list-filter">
      <span class="input-group-addon"><icon name="search" scale="1"></icon></span>
      <input type="text" class="form-control" placeholder="" v-model="keyName">
    </div>
    <b-list-group flush>
      <b-list-group-item
        v-for="setKey in filteredKeys"
        key="key"
        @click="getKeyValue(setKey)"
        :class="{ active: setKey === currentKey }"
      >
        {{ setKey }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        keyName: ''
      }
    },

    computed: {
      ...mapState(['keysSet', 'currentKey']),
      filteredKeys () {
        return this.keysSet.filter(key => key.includes(this.keyName))
      }
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
