<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from 'electron'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  name: string = 'test'

  mounted() {
// TODO: work out how to declare Electron within typescript
//    const { ipcRenderer } = this.$electron;
    ipcRenderer.send('test.ping', 'lol')
    ipcRenderer.on('test.pong', (event, arg: string) => {
      this.name = arg;
    })
  }
}
</script>

<style lang="sass" scoped>

</style>
