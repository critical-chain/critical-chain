import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  estimations: []
}

const getters = {
  listEstimations: state => state.estimations
}

const mutations = {
  ADD_ESTIMATION (state, estimation) {
    state.estimations.push(estimation)
  }
}

import actions from './actions'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
