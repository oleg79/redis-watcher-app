<template>
  <div>
    <span class="badge badge-danger">{{ propertyName | safeKey(' - ')  }}:</span>
    <span class="badge badge-primary">Object:</span>
    <ul>
      <li
        v-for="(val, key) in value"
        :key="key"
        :class="{ closed: !isOpen }"
      >
        <ValueResolver
          :value="val"
          :propertyName="key"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  import ValueResolver from './ValueResolver.vue'
  import mixin from './mixin'

  export default {
    props: ['value', 'propertyName'],

    mixins: [mixin],

    data() {
      return {
        isOpen: true
      }
    },

    methods: {
      toggle() {
        this.isOpen = !this.isOpen
      }
    },

    beforeCreate() {
      this.$options.components = {
        ValueResolver
      }
    }
  }
</script>

<style lang="sass">

</style>
