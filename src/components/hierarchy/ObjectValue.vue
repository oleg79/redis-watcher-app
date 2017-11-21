<template>
  <div>
    <span class="badge badge-danger">{{ propertyName }}:</span>
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
