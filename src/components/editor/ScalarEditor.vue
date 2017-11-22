<template>
  <div v-if="view === 'read'">
    <div
      @mouseenter="showControls = true"
      @mouseleave="showControls = false"
    >
      <div class="value-info">
        <b-badge variant="danger">{{ valueKey }}:</b-badge>
        <b-badge variant="primary">{{ valueType }}:</b-badge>
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

    <div v-if="view === 'edit'">
      <input
        type="text"
        class="form-control"
        v-model="value"
      />
    </div>
  </div>

</template>

<script>
  export default {
    props: [
      'valuePath',
      'valueKey',
      'valueType',
      'value',
    ],

    data() {
      return {
        showControls: false,
        view: 'read'
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
</style>
