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
        `notification-${notification.type}`,
        `notification-body-${notification.type}`
        ]"
      @mouseover="delta = 0"
      @mouseout="delta = 1"
    >
      <div
        class="notification-title"
        :class="`notification-${notification.type}-title`"
      >
        <div class="title">
          title
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
        {{ text }}
      </div>
      <div
        class="notification-duration"
        :class="`notification-${notification.type}-duration`"
        :style="{ width: `${duration}%` }"
      ></div>
    </div>
  </transition>
</template>

<script>
  import makeNotification from '../../services/notification';
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
      text() {
        return this.notification.type
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

      &-title
        background: #7F0A00


      &-duration
        background: #7F0A00


    &-info

    &-success

</style>
