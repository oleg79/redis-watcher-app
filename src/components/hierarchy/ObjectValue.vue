<template>
  <div>
    <span
      class="badge badge-default"
      @click="isOpen = !isOpen"
    >
      <icon
        :name="isOpen ? 'arrow-down' : 'arrow-right'"
      ></icon>
    </span>

    <span class="badge badge-danger">{{ propertyName | safeKey(' - ')  }}:</span>
    <span class="badge badge-primary">Object:</span>
    <span class="badge badge-default" v-if="!isOpen">...</span>
    <ul :class="{ 'd-none': !isOpen }">
      <li
        v-for="(val, key) in value"
        :key="key"
      >
        <ValueResolver
          :value="val"
          :propertyName="key"
          :pathChunk="valuePath"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon.vue'
  import ValueResolver from './ValueResolver.vue'
  import mixin from './mixin'

  export default {
    props: ['value', 'propertyName', 'valuePath'],

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
        ValueResolver,
        'icon': Icon
      }
    }
  }
</script>

<style lang="sass">

</style>
