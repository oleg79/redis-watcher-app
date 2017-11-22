<template>
  <div>
    <div
      class="value-container"
      v-if="view === 'read'"
      @mouseenter="showControls = true"
      @mouseleave="showControls = false"
    >
      <div class="value-info">
        <b-badge variant="danger">{{ propertyName | safeKey(' - ') }}:</b-badge>
        <b-badge variant="primary">{{ typeof value }}:</b-badge>
        <span>{{ value }}</span>
      </div>
      <div
        class="value-controls"
        v-if="showControls"
      >
        <span @click="view = 'edit'">edit</span>
        <span>delete</span>
      </div>
    </div>

    <div
      v-if="view === 'edit'"
      class="value-editor"
    >
      <div class="editing">
        <input
          type="text"
          class="form-control"
          v-model="selfValue"
        />
      </div>
      <div class="editing-actions">
        <span @click="saveValue">save</span>
        <span>cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import mixin from './mixin'

  export default {
    props: ['value', 'propertyName', 'valuePath'],

    mixins: [mixin],

    data() {
      return {
        selfValue: this.value,
        showControls: false,
        view: 'read'
      }
    },

    computed: {
      ...mapState(['currentKey', 'keyValue'])
    },

    methods: {
      ...mapMutations(['updateKeyValue']),

      saveValue() {
        this.updateKeyValue({
          path: this.valuePath.join('.'),
          value: this.selfValue
        })

        this.view = 'read'

        this.$electron.ipcRenderer.send('redis.key:update', {
          key: this.currentKey,
          value: this.keyValue
        })
      }
    },

  }
</script>

<style lang="sass">
  .value
    &-container
      overflow: hidden

    &-info
      float: left
      width: 75%

    &-controls
      float: right
      width: 25%

    &-editor
      overflow: hidden
      width: 100%

      .editing
        width: 50%
        float: left

        &-actions
          width: 50%
          float: right
</style>
