import Vue from 'vue'
import VueElectron from 'vue-electron'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import BootstrapVue from 'bootstrap-vue'
import TreeView from 'vue-json-tree-view'
import store from './store'
import App from './App.vue'

Vue.use(VueElectron)
Vue.use(VueLodash, lodash)
Vue.use(BootstrapVue)
Vue.use(TreeView)

export const eventBus = new Vue() // eslint-disable-line

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
