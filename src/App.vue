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
import { mapMutations } from 'vuex'
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


  methods: {
    ...mapMutations(['pushNotification'])
  },

  created() {
    const { ipcRenderer } = this.$electron

    ipcRenderer.on('app.error', (event, data) => {
      this.pushNotification({ data, type: 'error' })
    })

    ipcRenderer.on('app.info', (event, data) => {
      this.pushNotification(data, 'info')
    })

    ipcRenderer.on('app.success', (event, data) => {
      this.pushNotification(data, 'success')
    })
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
