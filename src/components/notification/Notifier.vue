<template>
  <div class="notification-container">
    <Notification
      v-for="(notification, index) in errorNotifications"
      :key="index"
      :type="'error'"
      :notification="notification"
    />

    <Notification
      v-for="(notification, index) in infoNotifications"
      :key="index"
      :type="'info'"
      :notification="notification"
    />

    <Notification
      v-for="(notification, index) in successNotifications"
      :key="index"
      :type="'success'"
      :notification="notification"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Notification from './Notification'

  export default {
    components: {
      Notification
    },

    computed: {
      ...mapGetters([
        'errorNotifications',
        'infoNotifications',
        'successNotifications'
      ])
    },


  }
</script>

<style lang="sass" scoped>
  .notification
    &-container
      display: flex
      justify-content: center
      width: 100%
      position: absolute
      z-index: 9999
      bottom: 90px
      height: 120px
</style>
