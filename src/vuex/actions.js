import PouchDB from 'pouchdb'
import uuid from 'uuid'

const db = new PouchDB('estimations')
window.PouchDB = PouchDB // TODO remove in production

import router from '../router'

export default {
  ADD_ESTIMATION ({commit}, {title}) {
    let estimationId = uuid.v4()
    let estimation = {_id: 'estimation:' + estimationId, id: estimationId, title, items: []}
    db.put(estimation)
    commit('ADD_ESTIMATION', estimation)
    router.push({name: 'estimation', params: {id: estimation.id}})
  },
  DELETE_ESTIMATION ({commit}, estimation) {
    db.get(estimation._id).then(doc => db.remove(doc))
    commit('DELETE_ESTIMATION', estimation)
  },
  LOAD_ESTIMATIONS ({commit, state}) {
    db.allDocs({include_docs: true, startkey: 'estimation:', endkey: 'estimation:\uffff'}).then(results => {
      if (!state.loaded) {
        let estimations = results.rows.map(estimation => estimation.doc)
        db.allDocs({include_docs: true, startkey: 'estimationItem:', endkey: 'estimationItem:\uffff'}).then(results => {
          results.rows.forEach(({doc}) => {
            let estimation = estimations.find(e => e.id === doc.estimationId)
            if (estimation) { estimation.items.push(doc) }
          })
          commit('LOAD_ESTIMATIONS', estimations)
          commit('MARK_AS_LOADED')
        })
      } else {
        commit('ALREADY_LOADED')
      }
    })
  },
  ADD_ESTIMATION_ITEM ({commit}, {estimationId, title}) {
    let estimationItemId = uuid.v4()
    let estimationItem = {
      _id: 'estimationItem:' + estimationId + ':' + estimationItemId,
      estimationId,
      id: estimationItemId,
      title
    }
    db.put(estimationItem)
    commit('ADD_ESTIMATION_ITEM', estimationItem)
  },
  DELETE_ESTIMATION_ITEM ({commit}, item) {
    db.get(item._id).then(doc => db.remove(doc))
    commit('DELETE_ESTIMATION_ITEM', item)
  }
}
