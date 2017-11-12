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

<script lang="ts">
import { ipcRenderer } from 'electron'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  name: string = 'test'
  databases: Array<Object> = []

  mounted() {
// TODO: work out how to declare Electron within typescript
//    const { ipcRenderer } = this.$electron;
    ipcRenderer.send('process:ui.ready')

    ipcRenderer.on('error:redis.client', (event: any, error: Object) => {
      console.log(error)
      alert('Connection error!')
    })

    ipcRenderer.on('received:databases.info', (event:any, databases: Array<Object>) => {
      this.databases = databases
    })
  }
}
</script>

<style lang="sass" scoped>

</style>
