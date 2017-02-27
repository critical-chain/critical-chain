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
  },
  hasEstimation: state => (uuid) => !!state.estimations.find(e => e.id === uuid)
}

const mutations = {
  ADD_ESTIMATION ({estimations}, estimation) {
    estimations.push(estimation)
  },
  DELETE_ESTIMATION ({estimations}, estimation) {
    let index = estimations.indexOf(estimation)
    estimations.splice(index, 1)
  },
  LOAD_ESTIMATIONS (state, estimations) {
    state.estimations = estimations
  },
  MARK_AS_LOADED (state) {
    state.loaded = true
  },
  ALREADY_LOADED () {
  },
  ADD_ESTIMATION_ITEM ({estimations}, item) {
    estimations.find(e => e.id === item.estimationId).items.push(item)
  },
  DELETE_ESTIMATION_ITEM ({estimations}, item) {
    let items = estimations.find(e => e.id === item.estimationId).items
    let index = items.indexOf(item)
    items.splice(index, 1)
  },
  START_ITEM_EDITING (_, item) {
    Vue.set(item, 'isEditing', true)
  },
  STOP_ITEM_EDITING (_, item) {
    Vue.set(item, 'isEditing', false)
  },
  UPDATE_ESTIMATION_ITEM (_, {item, newData}) {
    for (var key in newData) {
      if (newData.hasOwnProperty(key)) {
        Vue.set(item, key, newData[key])
      }
    }
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
