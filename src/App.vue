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
    ipcRenderer.send('process:ui.ready')
    ipcRenderer.on('error:redis.client', (event: any, error: Object) => {
      console.log(error);
      alert('Connection error!');
    })
  }
}
</script>

<style lang="sass" scoped>

</style>
