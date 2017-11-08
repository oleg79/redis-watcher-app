<template>
  <div>
    <h1>test</h1>
    <span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
  name: 'app',
  data () {
    return {
      //
    }
  },
  mounted() {
    ipcRenderer.send('test.ping', 'lol');
    ipcRenderer.on('test.pong', (event, arg) => {
      console.log(arg);
    });
  }
}
</script>

<style lang="sass" scoped>

</style>
