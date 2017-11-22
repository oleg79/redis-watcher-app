import Vue from 'vue'
import VueElectron from 'vue-electron'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import BootstrapVue from 'bootstrap-vue'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import store from './store'
import App from './App.vue'

Vue.use(VueElectron)
Vue.use(VueLodash, lodash)
Vue.use(BootstrapVue)

Vue.component('icon', Icon)

export const eventBus = new Vue() // eslint-disable-line

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  components: {
    Icon
  }
})
