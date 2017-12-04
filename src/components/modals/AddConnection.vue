<template>
  <b-form @submit="addConnection" name="add_connection" novalidate>
    <b-form-group
      id="redis_host_group"
      :label="$formatMessage({ id: 'host.label' })"
      label-for="redis_host"
      :description="$formatMessage({ id: 'host.description' })"
    >
      <b-form-input
        id="redis_host"
        type="text"
        v-model="newConnection.host"
        required
        :placeholder="$formatMessage({ id: 'host.placeholder' })"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="redis_port_group"
      :label="$formatMessage({ id: 'port.label' })"
      label-for="redis_port"
      :description="$formatMessage({ id: 'port.description' })"
    >
      <b-form-input
        id="redis_port"
        type="text"
        v-model="newConnection.port"
        required
        :placeholder="$formatMessage({ id: 'port.placeholder' })"
      ></b-form-input>
    </b-form-group>

    <div>
      <b-link v-b-toggle.additional_settings variant="primary">
        {{ $formatMessage({ id: 'additional.settings.label' }) }}
      </b-link>
      <b-collapse id="additional_settings" class="mt-2">
        <b-form-group
          id="redis_pass_group"
          :label="$formatMessage({ id: 'pass.label' })"
          label-for="redis_pass"
          :description="$formatMessage({ id: 'pass.description' })"
        >
          <b-form-input
            id="redis_pass"
            type="password"
            v-model="newConnection.password"
            required
            :placeholder="$formatMessage({ id: 'pass.placeholder' })"
          ></b-form-input>
        </b-form-group>
      </b-collapse>
    </div>

    <b-button type="submit" variant="outline-primary">
      {{ $formatMessage({ id: 'add.connection' }) }}
    </b-button>
    <b-button variant="outline-danger">
      {{ $formatMessage({ id: 'exit.label' }) }}
    </b-button>

    <div class="lang-switch">
      <b-form-select
        class="mb-3"
        v-model="language"
        :options="languages"
      >
      </b-form-select>
    </div>
  </b-form>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import LocalStorage from '../../services/localStorage'
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

    computed: {
      ...mapState(['appSettings']),
      languages() {
        return this.appSettings.languages
      },
      language:{
        get() {
          return this.appSettings.language
        },

        set(language) {
          LocalStorage.setItem('settings', {...this.appSettings, language})
          Vue.setLocale(language)
        }
      },
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

  .lang-switch
    width: 65px
    float: right
</style>
