<template>
  <transition
    name="notification-transition"
    enter-active-class="animated slideInUp"
    leave-active-class="animated fadeOut"
  >
    <div
      v-if="visible"
      class="notification-body"
      :class="[
        `notification-${type}`,
        `notification-body-${type}`
        ]"
      @mouseover="delta = 0"
      @mouseout="delta = 1"
    >
      <div
        class="notification-title"
        :class="`notification-${type}-title`"
      >
        <div class="title">
          {{ $formatMessage({ id: notification.code }) }}
        </div>
        <button
          class="close"
          @click="visible = false"
        >
          <icon
            name="times"
            scale="1"
          ></icon>
        </button>
      </div>
      <div class="notification-text">
        {{ notificationText }}
      </div>
      <div
        class="notification-duration"
        :class="`notification-${type}-duration`"
        :style="{ width: `${duration}%` }"
      ></div>
    </div>
  </transition>
</template>

<script>
  import { Data } from './types'

  export default {

    props: [ 'type', 'notification' ],

    data(): Data {
      return {
        visible: true,
        duration: 0,
        maxDuration: 100,
        delta: 1
      }
    },

    computed: {
      notificationText() {
        if (this.notification.code === 'redis.pubsub.message') {
          const { channel, message } = this.notification.data

          return `${channel} : ${message}`
        }
        return ''
      }
    },

    mounted() {
      const interval = setInterval(() => {
        this.duration += this.delta
        if (this.duration >= this.maxDuration) {
          this.visible = false
          this.duration = 0
          clearInterval(interval)
        }
      }, 40)
    }
  }
</script>

<style lang="sass" scoped>
  .notification
    &-body
      position: relative
      width: 600px
      height: 120px

      &-info
        order: 0

      &-error
        order: 1

      &-succes
        order: 2



    &-title
      width: 100%
      overflow: hidden

      .close
        float: right
        width: 25px
        cursor: pointer

      .title
        float: left
        width: 575px
        padding-left: 7px
        font-weight: bold

    &-text
      padding: 7px

    &-duration
      position: absolute
      left: 0
      bottom: -4px
      width: 0%
      height: 4px
      transition: width

    &-error
      background: #BF0F00
      color: #fff

      &-title,
      &-duration
        background: #7F0A00


    &-info
      background: #114BBF
      color: #fff

      &-title,
      &-duration
        background: #0B327F

    &-success
      background: #88BF15
      color: #252525

      &-title,
      &-duration
        background: #5B7F0E

</style>
