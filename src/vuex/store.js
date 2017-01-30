import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  estimations: [],
  loaded: false
}

const getters = {
  listEstimations: state => state.estimations,
  getEstimation: state => (uuid) => {
    return state.estimations.find(e => e.id === uuid) || {}
  }
}

const mutations = {
  ADD_ESTIMATION (state, estimation) {
    state.estimations.push(estimation)
  },
  LOAD_ESTIMATIONS (state, estimations) {
    state.estimations = estimations
  },
  MARK_AS_LOADED (state) {
    state.loaded = true
  },
  ALREADY_LOADED () {}
}

import actions from './actions'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: true
})
