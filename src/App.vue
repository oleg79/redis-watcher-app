<template>
  <div class="container-fluid">
    <TopNavigation

    />

    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-6">
            <KeysList class="r-list"/>
          </div>

          <div class="col-6">
            <ValueEditor class="r-list"/>
          </div>
        </div>
      </div>
    </div>

    <StartModal/>

    <Notifier/>
  </div>

</template>

<script>
/** @flow */
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
// Components
import TopNavigation from './components/top-navigation/TopNavigation.vue'
import KeysList from './components/info-list/KeysList.vue'
import ValueEditor from './components/info-list/ValueEditor.vue'
import StartModal from './components/modals/StartModal.vue'
import Notifier from './components/notification/Notifier.vue'

export default {
  components: {
    TopNavigation,
    KeysList,
    ValueEditor,
    StartModal,
    Notifier
  },

  computed: {
    ...mapState(['appSettings'])
  },

  methods: {
    ...mapMutations(['pushNotification'])
  },


  created() {

    const { language, checkInterval } = this.appSettings
    Vue.setLocale(language)

    const { ipcRenderer } = this.$electron

    ipcRenderer.on('app.error', (event, data) => {
      console.log(data)
      this.pushNotification(data)
    })

    ipcRenderer.on('app.info', (event, data) => {
      this.pushNotification(data)
    })

    ipcRenderer.on('app.success', (event, data) => {
      this.pushNotification(data)
    })

    // setInterval(() => {
    //   const data = { code:'redis.connection.error', data:{}, type: 'info' }
    //   this.pushNotification(data)
    // }, checkInterval)
  }
};
</script>

<style lang="sass" scoped>
  .container-fluid
    padding: 0

  .r-list
    height: 720px
    overflow-x: hidden
    overflow-y: auto
    background: #fff
</style>
