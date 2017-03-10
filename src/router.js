import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './vuex/store'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('EstimationsList') }, // Default
    { path: '/estimation/:id', name: 'estimation', component: load('Estimation'), props: true }
  ]
})

function estimationDoesntExistGuard (to, _from, next) {
  if (store.state.loaded) {
    if (to.name === 'estimation' && !store.getters.getEstimation(to.params.id)._id) {
      router.replace('/')
    }
  } else {
    let unwatch = store.watch(({loaded}) => loaded, () => {
      if (to.name === 'estimation' && !store.getters.getEstimation(to.params.id)._id) {
        router.replace('/')
      }
      unwatch()
    })
  }
  next()
}

router.beforeEach(estimationDoesntExistGuard)

export default router
