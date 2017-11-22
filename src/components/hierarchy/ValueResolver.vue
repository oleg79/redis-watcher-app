<template>
  <div class="hierarchy-group">
    <component
      :is="valueComponent"
      :value="value"
      :propertyName="propertyName"
      :valuePath="valuePath"
    ></component>
  </div>

</template>

<script>
  import ScalarValue from './ScalarValue.vue'
  import ArrayValue from './ArrayValue.vue'
  import ObjectValue from './ObjectValue.vue'

  export default {
    props: ['value', 'propertyName', 'pathChunk'],

    computed: {
      valueComponent() {
        switch ( ({}).toString.call(this.value).match(/\s([a-zA-Z]+)/)[1].toLowerCase() ) {
          case 'object': return 'ObjectValue';
          case 'array': return 'ArrayValue';
          default: return 'ScalarValue';
        }
      },

      valuePath() {
        if (undefined === this.pathChunk) {
          return []
        }
        else if (Array.isArray(this.pathChunk)) {
          return this.pathChunk.concat(this.propertyName)
        }
        return [ this.propertyName ]
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
    padding: 15px 0 10px 15px

  .closed
    height: 0
    overflow: hidden

</style>
