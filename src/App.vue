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
  </div>

</template>

<script>
/** @flow */

// Components
import TopNavigation from './components/top-navigation/TopNavigation.vue'
import KeysList from './components/info-list/KeysList.vue'
import ValueEditor from './components/info-list/ValueEditor.vue'
import StartModal from './components/modals/StartModal.vue'

export default {
  components: {
    TopNavigation,
    KeysList,
    ValueEditor,
    StartModal
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
