/** @flow */

export default {
  methods: {
    exitApp () {
      this.$electron.ipcRenderer.send('app.exit')
    }
  }
}
