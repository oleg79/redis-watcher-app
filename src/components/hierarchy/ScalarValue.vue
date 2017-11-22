<template>
  <div>
    <div
      class="value-container"
      v-if="view === 'read'"
      @mouseenter="showControls = true"
      @mouseleave="showControls = true"
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
        <button
          class="r-btn edit"
          v-b-tooltip.hover
          title="edit"
          @click="view = 'edit'"
        >
          <icon
            name="pencil"
            scale="1.5"
          ></icon>
        </button>

        <button
          class="r-btn delete"
          v-b-tooltip.hover
          title="delete"
          @click="showDeleteModal"
        >
          <icon
            name="trash"
            scale="1.5"
          ></icon>
        </button>
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

    <b-modal
      ref="deleteModal"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <div>
        <b-alert show variant="warning">Are you sure?</b-alert>
        <div>
          {{ pathAsString }} : {{ value }}
        </div>
        <div>
          <b-button
            variant="danger"
            @click="deleteValue"
          >
            delete
          </b-button>

          <b-button
            variant="primary"
            @click="closeDeleteModal"
          >
            cancel
          </b-button>
        </div>
      </div>
    </b-modal>
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
        showControls: true,
        view: 'read'
      }
    },

    computed: {
      ...mapState(['currentKey', 'keyValue']),

      pathAsString() {
        return this.valuePath.join('.')
      }
    },

    methods: {
      ...mapMutations(['updateKeyValue', 'deleteKeyValue']),

      showDeleteModal() {
        this.$refs.deleteModal.show()
      },

      closeDeleteModal() {
        this.$refs.deleteModal.hide()
      },

      saveValue() {
        this.updateKeyValue({
          path: this.pathAsString,
          value: this.selfValue
        })

        this.view = 'read'

        this.$electron.ipcRenderer.send('redis.key:update', {
          key: this.currentKey,
          value: this.keyValue
        })
      },

      deleteValue() {
        this.deleteKeyValue(this.pathAsString)

        this.$electron.ipcRenderer.send('redis.key:update', {
          key: this.currentKey,
          value: this.keyValue
        })

        this.$refs.deleteModal.hide()
      }
    },

  }
</script>

<style lang="sass">
  @mixin rect($val)
    width: $val
    height: $val

  .value
    &-container
      overflow: hidden
      padding: 2px
      line-height: 29px

      &:hover
        background: #bdbdbd

    &-info
      float: left
      width: auto
      margin-right: 0

    &-controls
      float: left
      width: auto
      margin-left: 15px

    &-editor
      overflow: hidden
      width: 100%

      .editing
        width: 50%
        float: left

        &-actions
          width: 50%
          float: right

  .r-btn
    @include rect(33px)
    outline: none
    border: none
    background: none
    padding: 3px 0 0 0
    cursor: pointer

    .delete
      margin-left: 10px

  .badge
    font-size: 14px
</style>
