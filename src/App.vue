<template>

</template>

<script>
/** @flow */
import Database from '../app/database'

export default {
  name: 'app',
  data() {
    return {
      name: 'test',
      databases: []
    }
  },
  mounted() {
    const { ipcRenderer } = this.$electron;
    ipcRenderer.send('process:ui.ready');

    const database = new Database('redis-watcher', 1)

    ipcRenderer.on('error:redis.client', (event: any, error: Object) => {
      console.log(error)
    })

    ipcRenderer.on('received:databases.info', (event: any, databases: Array<Object>) => {
      this.databases = databases
    })
  }
};
</script>

<style lang="sass" scoped>

</style>
