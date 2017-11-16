<template>

  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a class="waves-effect waves-light btn">button</a>
          </li>
          <!--<li><a href="badges.html">Components</a></li>-->
          <!--<li><a href="collapsible.html">JavaScript</a></li>-->
        </ul>
      </div>
    </nav>
  </div>

  <!--<div>-->
    <!--<div class="mdl-layout mdl-js-layout mdl-layout&#45;&#45;fixed-header">-->
      <!--<header class="mdl-layout__header mdl-layout__header&#45;&#45;waterfall main-header">-->
        <!--<div class="mdl-layout__header-row">-->
          <!--&lt;!&ndash; Title &ndash;&gt;-->
          <!--<span class="mdl-layout-title">Title</span>-->
          <!--<span class="mdl-chip" v-if="redisConnectionError">-->
          <!--<span class="mdl-chip__text">{{ redisConnectionError }}</span>-->
        <!--</span>-->

          <!--<span class="mdl-chip" v-if="redisConnected">-->
          <!--<span class="mdl-chip__contact mdl-color&#45;&#45;teal mdl-color-text&#45;&#45;white">A</span>-->
          <!--<span class="mdl-chip__text">Connection had been established!</span>-->
        <!--</span>-->

          <!--<span class="mdl-chip">-->
          <!--<span class="mdl-chip__text">Saved connections: {{ savedConnections }}</span>-->
        <!--</span>-->
        <!--</div>-->
      <!--</header>-->
    <!--</div>-->
    <!--<dialog class="mdl-dialog">-->
      <!--<div class="mdl-dialog__content">-->
        <!--<p>-->
          <!--Sorry, no saved connections were found...-->
        <!--</p>-->
        <!--<p>-->
          <!--Please create a new one-->
        <!--</p>-->
      <!--</div>-->
      <!--<form action="#">-->
        <!--<div class="mdl-textfield mdl-js-textfield">-->
          <!--<input class="mdl-textfield__input" type="text" id="sample1">-->
          <!--<label class="mdl-textfield__label" for="sample1">Text...</label>-->
        <!--</div>-->
      <!--</form>-->
      <!--<div class="mdl-dialog__actions mdl-dialog__actions&#45;&#45;full-width">-->
        <!--<button type="button" class="mdl-button">Agree</button>-->
        <!--<button type="button" class="mdl-button close">Disagree</button>-->
      <!--</div>-->
    <!--</dialog>-->
  <!--</div>-->
</template>

<script>
/** @flow */
import { localDatabaseName } from '../configs'
import { REDIS_CONNECTION_ERROR, REDIS_CONNECTION_SUCCESS } from '../channels_constants'
import { Data } from './App.types'
import Database from './services/database'

export default {
  name: 'app',

  data(): Data {
    return {
      connected: false,
      savedConnections: 0,
      redisConnected: false,
      redisConnectionError: null
    }
  },

  mounted() {
    const { ipcRenderer } = this.$electron;
    ipcRenderer.send('process:ui.ready');

    const database = new Database(localDatabaseName, 1)

    database.getConnectionsCount().then((count:number) => {
      this.savedConnections = count
    })

    ipcRenderer.on(REDIS_CONNECTION_ERROR, (event: any, error: Object) => {
      this.redisConnectionError = error
    })

    ipcRenderer.on(REDIS_CONNECTION_SUCCESS, () => {
      this.redisConnected = true
    })
  }
};
</script>

<style lang="sass" scoped>

</style>
