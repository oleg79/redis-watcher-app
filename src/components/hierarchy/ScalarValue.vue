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
        <button
          class="r-btn edit"
          v-b-tooltip.hover
          title="edit"
          @click="switchToEditMode"
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
      v-show="view === 'edit'"
      class="value-editor"
    >
      <div class="editing">
        <div class="value-info">
          <b-badge variant="danger">{{ propertyName | safeKey(' - ') }}:</b-badge>
          <b-badge variant="primary">{{ typeof value }}:</b-badge>
          <input
            type="text"
            ref="valueEditor"
            class="form-control r-edit-input"
            v-model="selfValue"
          />
        </div>
      </div>
      <div class="editing-actions">
        <button
          class="r-btn save"
          v-b-tooltip.hover
          title="save"
          @click="saveValue"
        >
          <icon
            name="floppy-o"
            scale="1.5"
          ></icon>
        </button>

        <button
          class="r-btn cancel"
          v-b-tooltip.hover
          title="cancel"
          @click="view = 'read'"
        >
          <icon
            name="ban"
            scale="1.5"
          ></icon>
        </button>
      </div>
    </div>

    <b-modal
      ref="deleteModal"
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <div>
        <b-alert show variant="warning">{{ $formatMessage({ id: 'delete.confirm' }) }}</b-alert>
        <div>
          {{ $formatMessage({ id: 'delete.confirm.text' }) }}
          {{ pathAsString }} : {{ value }}
        </div>
        <div>
          <b-button
            variant="danger"
            @click="deleteValue"
          >
            {{ $formatMessage({ id: 'delete.ok' }) }}
          </b-button>

          <b-button
            variant="primary"
            @click="closeDeleteModal"
          >
            {{ $formatMessage({ id: 'delete.cancel' }) }}
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
        showControls: false,
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
      },

      switchToEditMode() {
        this.$refs.valueEditor.focus()
        this.view = 'edit'
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
      padding: 2px 2px 2px 29px
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
      height: 29px

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

  .r-edit-input
    float: right
    width: 130px
    font-size: 16px
    outline: none
    border: none
    padding: 0
    margin-left: 10px
    border-bottom: 2px solid #000
    border-radius: 0

    &:focus
      outline: none
      border: none
      border-bottom: 2px solid #000
</style>
