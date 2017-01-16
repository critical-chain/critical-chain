import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from './App'
import store from './vuex/store'
import router from './router'

sync(store, router)

import './vendor/primer.v4_3_0.css'

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router
})
