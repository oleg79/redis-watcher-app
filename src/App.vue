<template>
  <div>
    <h1>{{ name }}</h1>
    <ul v-if="databases.length" class="mdl-list">
      <li v-for="database in databases" class="mdl-list__item">
        {{ database.name }}
      </li>
    </ul>
  </div>
</template>

<script>
/** @flow */
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

    ipcRenderer.on('error:redis.client', (event: any, error: Object) => {
      console.log(error)
      alert('Connection error!')
    })

    ipcRenderer.on('received:databases.info', (event, databases) => {
      this.databases = databases
    })
  }
};
</script>

<style lang="sass" scoped>

</style>
