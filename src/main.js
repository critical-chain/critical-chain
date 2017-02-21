import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import 'babel-polyfill'

import App from './App'
import store from './vuex/store'
import router from './router'

sync(store, router)

import './vendor/primer.v4_7_0.css'

const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router,
  methods: {
    init () {
      this.$store.dispatch('LOAD_ESTIMATIONS')
    }
  }
})

app.init()
