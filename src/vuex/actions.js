import PouchDB from 'pouchdb'
import uuid from 'uuid'

const db = new PouchDB('estimations')
window.PouchDB = PouchDB // TODO remove in production

export default {
  ADD_ESTIMATION({commit}, {title}) {
    let estimationId = uuid.v4()
    let estimation = {_id: 'estimation:'+estimationId, id: estimationId, title, items: []}
    db.put(estimation)
    commit('ADD_ESTIMATION', estimation)
  },
  LOAD_ESTIMATIONS({commit, state}) {
    db.allDocs({include_docs: true, startkey: 'estimation:', endkey: "estimation:\uffff"}).then(results => {
      if(!state.loaded) {
        commit('LOAD_ESTIMATIONS', results.rows.map(estimation => estimation.doc))
        db.allDocs({include_docs: true, startkey: 'estimationItem:', endkey: "estimationItem:\uffff"}).then(results => {
          results.rows.forEach(({doc}) => {
            commit('ADD_ESTIMATION_ITEM', doc)
          });
          commit('MARK_AS_LOADED')
        })
      } else {
        commit('ALREADY_LOADED')
      }
    })
  },
  ADD_ESTIMATION_ITEM({commit}, {estimationId, title}) {
    let estimationItemId = uuid.v4()
    let estimationItem = { _id: 'estimationItem:'+estimationId+':'+estimationItemId, estimationId, id: estimationItemId, title }
    db.put(estimationItem)
    commit('ADD_ESTIMATION_ITEM', estimationItem)
  }
}
