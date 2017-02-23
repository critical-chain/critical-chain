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
  DELETE_ESTIMATION (state, estimation) {
    let index = state.estimations.indexOf(estimation)
    state.estimations.splice(index, 1)
  },
  LOAD_ESTIMATIONS (state, estimations) {
    state.estimations = estimations
  },
  MARK_AS_LOADED (state) {
    state.loaded = true
  },
  ALREADY_LOADED () {
  },
  ADD_ESTIMATION_ITEM (state, item) {
    state.estimations.find(e => e.id === item.estimationId).items.push(item)
  },
  DELETE_ESTIMATION_ITEM (state, item) {
    let items = state.estimations.find(e => e.id === item.estimationId).items
    let index = items.indexOf(item)
    items.splice(index, 1)
  }
}

import actions from './actions'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: true
})
