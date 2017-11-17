import Vue from 'vue'
import VueElectron from 'vue-electron'
import VModal from 'vue-js-modal'
import App from './App.vue'

Vue.use(VueElectron)
Vue.use(VModal)

export const eventBus = new Vue() // eslint-disable-line

new Vue({
  el: '#app',
  render: h => h(App)
})
