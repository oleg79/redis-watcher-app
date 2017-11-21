<template>
  <div>
    <ValueResolver :value="hierarchy"/>
  </div>
</template>

<script>
  import ValueResolver from '../hierarchy/ValueResolver.vue'
  export default {
    components: {
      ValueResolver
    },
    props: ['hierarchy']
  }
</script>

<style lang="sass">

</style>
