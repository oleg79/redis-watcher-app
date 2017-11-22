/** @flow */
// $FlowFixMe
import Vue from 'vue'
// $FlowFixMe
import Vuex from 'vuex'
// $FlowFixMe
import _ from 'lodash'
import LocalStorage from '../services/localStorage'
import defaultSettings from '../../default_settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appSettings: {
      ...defaultSettings,
      ...LocalStorage.getItem('settings')
    },
    redisConnections: [],
    currentConnection: null,
    databases: [],
    currentDatabase: null,
    keysSet: [],
    currentKey: null,
    keyValue: null,
    redisError: null,
    connected: false
  },

  getters: {
    savedConnectionsCount: state =>
      state.redisConnections.length,

    redisConnectionsOptions: state =>
      state.redisConnections.map(({ host, port }, index) => ({
        value: index,
        text: `${host}:${port}`
      })),

    isRedisError: state =>
      state.redisError !== null
  },

  mutations: {
    setConnections: (state:Object, payload:Array<Object>) => {
      state.redisConnections = payload
    },

    setConnected: (state:Object, payload:boolean) => {
      state.connected = payload
    },

    setDatabases: (state:Object, payload:Array<Object>) => {
      state.databases = payload
    },

    setCurrentDatabase: (state:Object, payload:Object) => {
      state.currentDatabase = payload
    },

    setRedisError: (state:Object, payload:Object) => {
      state.redisError = payload
    },

    setKeysSet: (state:Object, payload: Array<string>) => {
      state.keysSet = payload
    },

    setKey: (state:Object, payload: Array<string>) => {
      state.currentKey = payload
    },

    setKeyValue: (state:Object, payload:any) => {
      state.keyValue = payload
    },

    updateKeyValue: (state:Object, { path, value }:Object) => {
      state.keyValue = _.set(_.cloneDeep(state.keyValue), path, value)
    }
  },

  actions: {}
})
