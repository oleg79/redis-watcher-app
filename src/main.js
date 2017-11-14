import Vue from 'vue';
import VueElectron from 'vue-electron';
import App from './App.vue';

Vue.use(VueElectron);

new Vue({
  el: '#app',
  render: h => h(App)
});
