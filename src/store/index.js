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
    currentKeyTTL: null,
    keyValue: null,
    redisError: null,
    connected: false,

    notifications: {
      error: [],
      success: [],
      info: [],
    },

    menu: {
      isOpened: false
    }
  },

  getters: {
    savedConnectionsCount: state =>
      state.redisConnections.length,

    redisConnectionsOptions: state =>
      state.redisConnections.map(({ host, port }, index) => ({
        value: index,
        text: `${host}:${port}`
      })),

    redisDatabasesOptions: state =>
      state.databases.map(({ name, keys }, index) => ({
        value: index,
        text: `${name}:${keys}`
      })),

    isRedisError: state =>
      state.redisError !== null,

    errorNotifications: state =>
      state.notifications.error,

    infoNotifications: state =>
      state.notifications.info,

    successNotifications: state =>
      state.notifications.success,

    isMenuOpened: state =>
      state.menu.isOpened,
  },

  mutations: {
    setConnections: (state:Object, payload:Array<Object>) => {
      state.redisConnections = payload
    },

    setCurrentConnection: (state: Object, payload: any) => {
      state.currentConnection = payload
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

    setKeyTTL: (state:Object, payload:any) => {
      state.currentKeyTTL = payload
    },

    updateKeyValue: (state:Object, { path, value }:Object) => {
      state.keyValue = _.set(_.cloneDeep(state.keyValue), path, value)
    },

    deleteKeyValue: (state:Object, path:string) => {
      state.keyValue = _.omit(state.keyValue, path)
    },

    pushNotification: (state:Object, { type, ...data }: Object) => {
      state.notifications = {
        ...state.notifications,
        [type]: [...state.notifications[type], data]
      }
    },

    toggleMenu: (state:Object) => {
      state.menu.isOpened = !state.menu.isOpened
    }
  },

  actions: {}
})
