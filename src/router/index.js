import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

import routes from "./routes";

Vue.use(VueRouter);

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
});

function estimationDoesntExistGuard (to, _from, next) {
  if (store.state.loaded) {
    if (to.name === "estimation" && !store.getters.getEstimation(to.params.id)._id) {
      Router.replace("/");
    }
  } else {
    let unwatch = store.watch(({loaded}) => loaded, () => {
      if (to.name === "estimation" && !store.getters.getEstimation(to.params.id)._id) {
        Router.replace("/");
      }
      unwatch();
    });
  }
  next();
}

Router.beforeEach(estimationDoesntExistGuard);

export default Router;
