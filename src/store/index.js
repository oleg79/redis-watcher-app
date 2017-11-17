import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../services/localStorage'
import defaultSettings from '../../default_settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appSettings: {
      ...defaultSettings,
      ...LocalStorage.getItem('settings')
    }
  }
})
