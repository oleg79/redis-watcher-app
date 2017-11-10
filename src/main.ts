import Vue from 'vue'
// import VueElectron from 'vue-electron';
import App from './App.vue'


// TODO: work out how to declare Electron within typescript
// Vue.use(VueElectron)

new Vue({
  el: '#app',
  render: h => h(App)
})


