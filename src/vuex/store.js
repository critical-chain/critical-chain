import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { loadEstimations } from './actions'

const state = {
  estimations: loadEstimations()
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
  }
}

import actions from './actions'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  // strict: true // TODO Enable me!
})
