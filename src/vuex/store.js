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
  ADD_ESTIMATION (state, payload) {
    state.estimations.push(payload)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
