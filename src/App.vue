<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ipcRenderer } from 'electron';

@Component
export default class App extends Vue {
  name: string = 'test';

  mounted() {
    ipcRenderer.send('test.ping', 'lol');
    ipcRenderer.on('test.pong', (event, arg: string) => {
      this.name = arg;
    });
  }
}
</script>

<style lang="sass" scoped>

</style>
