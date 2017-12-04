<template>
  <b-form @submit.prevent="connect">
    <b-form-group
      id="redis_connection_group"
      :label="$formatMessage({ id: 'select.connection' })"
      label-for="redis_connection"
      :description="$formatMessage({ id: 'select.connection.description' })"
    >
      <b-form-select
        v-model="selected"
        :options="redisConnectionsOptions"
        class="mb-3"
        @change="connect"
      >
      </b-form-select>
    </b-form-group>

    <b-button type="submit" variant="outline-primary">
      {{ $formatMessage({ id: 'connect.label' }) }}
    </b-button>
    <b-button variant="outline-primary">
      {{ $formatMessage({ id: 'add.connection' }) }}
    </b-button>
    <b-button
      variant="outline-danger"
      @click="exitApp"
    >
      {{ $formatMessage({ id: 'exit.label' }) }}
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
    ...mapMutations(['setCurrentConnection']),
    connect() {
      const selected = this.redisConnections[ this.selected ]
      const { host, port } = selected

      this.$electron.ipcRenderer.send('connection:try.establish', { host, port })

      this.setCurrentConnection(selected)
    },
  },
}
</script>

<style lang="sass">

</style>
