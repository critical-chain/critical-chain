import Vue from "vue";
import Vuex from "vuex";

import estimationsList from "./estimations-list";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    estimationsList
  }
});

export default store;
