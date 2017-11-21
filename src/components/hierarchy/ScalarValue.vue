<template>
  <div class="value-container">
    <div class="value-info">
      <b-badge variant="danger">{{ propertyName }}:</b-badge>
      <b-badge variant="primary">{{ typeof value }}:</b-badge>
      <span>{{ value }}</span>
    </div>
    <div class="value-actions">
      <span>edit</span>
      <span>delete</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value', 'propertyName']
  }
</script>

<style lang="sass">
  .value

    &-container
      overflow: hidden

    &-info
      float: left
      width: 75%

    &-actions
      float: right
      width: 25%
</style>
