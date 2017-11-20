<template>
  <b-form @submit.prevent="connect">
    <b-form-group
      id="redis_connection_group"
      label="Select connection"
      label-for="redis_connection"
      description="Please, select connection"
    >
      <b-form-select
        v-model="selected"
        :options="redisConnectionsOptions"
        class="mb-3"
        @change="connect"
      >
      </b-form-select>
    </b-form-group>

    <b-button type="submit" variant="outline-primary">connect</b-button>
    <b-button variant="outline-primary">add connection</b-button>
    <b-button
      variant="outline-danger"
      @click="exitApp"
    >
      exit
    </b-button>
  </b-form>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
//  import * as configs from '../../../configs'
//  import Database from '../../services/indexedDB'
//  import { REDIS_CONNECTION_ERROR, REDIS_CONNECTION_SUCCESS } from'../../../channels_constants'
  import { eventBus } from '../../main'
  import mixin from './mixin'
  //  import { sanitizeOptionsObject } from '../../helpers/sanitize'

export default {
  mixins: [mixin],
  data() {
    return {
      selected: 0
    }
  },

  computed: {
    ...mapState(['redisConnections']),
    ...mapGetters(['redisConnectionsOptions']),
  },

  methods: {
    connect() {
      const { host, port } = this.redisConnections[ this.selected ]

      this.$electron.ipcRenderer.send('connection:try.establish', { host, port })
    },
  },
}
</script>

<style lang="sass">

</style>
