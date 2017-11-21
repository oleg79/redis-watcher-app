<template>
  <div>
    <span class="badge badge-danger">{{ propertyName }}:</span>
    <span class="badge badge-primary">Array:</span>
    <ul v-if="value.length">
      <li
        v-for="(val, index) in value"
        :key="index"
        :class="{ closed: !isOpen }"
      >
        <ValueResolver
          :value="val"
          :propertyName="index"
        />
      </li>
    </ul>
    <span class="badge badge-warning" v-else>empty</span>
  </div>

</template>

<script>
  import ValueResolver from './ValueResolver.vue'

  export default {
    props: ['value', 'propertyName'],

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
