<template>
  <div class="hierarchy-group">
    <component
      :is="valueComponent"
      :value="value"
      :propertyName="propertyName"
    ></component>
  </div>

</template>

<script>
  import ScalarValue from './ScalarValue.vue'
  import ArrayValue from './ArrayValue.vue'
  import ObjectValue from './ObjectValue.vue'

  export default {
    props: ['value', 'propertyName'],
    computed: {
      valueComponent() {
        switch ( ({}).toString.call(this.value).match(/\s([a-zA-Z]+)/)[1].toLowerCase() ) {
          case 'object': return 'ObjectValue';
          case 'array': return 'ArrayValue';
          default: return 'ScalarValue';
        }
      }
    },

    beforeCreate() {
      this.$options.components = {
        ScalarValue,
        ArrayValue,
        ObjectValue
      }
    },
  }
</script>

<style lang="sass">
  ul
    list-style: none
    padding: 5px 15px

  .closed
    height: 0
    overflow: hidden

</style>
