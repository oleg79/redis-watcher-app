<template>
  <div :class="{'r-empty-array': !value.length}">
    <span
      class="badge badge-default"
      v-if="value.length"
      @click="isOpen = !isOpen"
    >
      <icon
        :name="isOpen ? 'arrow-down' : 'arrow-right'"
      ></icon>
    </span>

    <span class="badge badge-danger">{{ propertyName | safeKey(' - ') }}:</span>
    <span class="badge badge-primary">Array:</span>
    <span class="badge badge-default" v-if="!isOpen">...</span>
    <ul
      v-if="value.length"
      :class="{ 'd-none': !isOpen }"
    >
      <li
        v-for="(val, index) in value"
        :key="index"
      >
        <ValueResolver
          :value="val"
          :propertyName="index"
          :pathChunk="valuePath"
        />
      </li>
    </ul>
    <span class="badge badge-warning" v-else>empty</span>
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
    .r-empty-array
      padding-left: 29px
</style>
