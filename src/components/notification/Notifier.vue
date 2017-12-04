<template>
  <div class="notification-container" v-if="isAppFocused">
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
  import makeNotification from '../../services/notification'
  import Notification from './Notification'

  export default {
    components: {
      Notification
    },

    data() {
      return {
        isAppFocused: true
      }
    },

    computed: {
      ...mapGetters([
        'errorNotifications',
        'infoNotifications',
        'successNotifications'
      ]),

      isMinimazed() {
        return this.$electron.remote.getCurrentWindow().isMinimized()
      }
    },

    mounted() {
      document.addEventListener("visibilitychange", () => {
        this.isAppFocused = document.hidden && document.visibilityState === 'visible'
      })
    },

    updated() {
      if (!this.isAppFocused) {
        [
          ...this.infoNotifications,
          ...this.errorNotifications,
          ...this.successNotifications
        ].forEach(({type, code, data}) => {
          makeNotification({
            title: `Redis Watcher - ${type}`,
            tag: code
          })
        })
      }
    }
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
      bottom: 70px
      height: 120px
</style>
