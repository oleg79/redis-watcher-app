<template>
  <b-form @submit="addConnection" name="add_connection" novalidate>
    <b-form-group
      id="redis_host_group"
      label="Host:"
      label-for="redis_host"
      description="Please, specify Redis host"
    >
      <b-form-input
        id="redis_host"
        type="text"
        v-model="newConnection.host"
        required
        placeholder="Enter host"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="redis_port_group"
      label="Port:"
      label-for="redis_port"
      description="Please, specify Redis port"
    >
      <b-form-input
        id="redis_port"
        type="text"
        v-model="newConnection.port"
        required
        placeholder="Enter port"
      ></b-form-input>
    </b-form-group>

    <div>
      <b-link v-b-toggle.additional_settings variant="primary">Additional Settings</b-link>
      <b-collapse id="additional_settings" class="mt-2">
        <b-form-group
          id="redis_pass_group"
          label="Password:"
          label-for="redis_pass"
          description="Please, specify Redis password"
        >
          <b-form-input
            id="redis_pass"
            type="password"
            v-model="newConnection.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
      </b-collapse>
    </div>

    <b-button type="submit" variant="outline-primary">add connection</b-button>
    <b-button variant="outline-danger">exit</b-button>
  </b-form>
</template>

<script>
  import * as configs from '../../../configs'
  import Database from '../../services/indexedDB'

  import { eventBus } from '../../main'
  import { sanitizeOptionsObject } from '../../helpers/sanitize'
  import mixin from './mixin'

  export default {
    mixins: [mixin],
    data() {
      return {
        newConnection: {
          host: null,
          port: null,
          password: null,
        },
        database: null
      }
    },

    methods: {
      addConnection() {

        if (this.newConnection.host && this.newConnection.port) {

          const sanitizedOptions = sanitizeOptionsObject(this.newConnection)

          this.database.addConnection(sanitizedOptions)
            .then(() => {


            })
            .catch(e => console.log(e))
        }

      }
    },

    created() {
      this.database = new Database(configs.localDatabaseName, 1)
    }
  }
</script>

<style lang="sass">
  .alert-danger
    background: rgba(255, 126, 126, 0.63)
    color: #ec2828
    font-weight: bold
</style>
