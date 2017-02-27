import PouchDB from 'pouchdb'
import { Utils } from 'quasar'

const db = new PouchDB('estimations')
window.PouchDB = PouchDB // TODO remove in production

import router from '../router'

export default {
  ADD_ESTIMATION ({commit}, {title}) {
    let estimationId = Utils.uid()
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
            doc.isEditing = false
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
    let estimationItemId = Utils.uid()
    let estimationItem = {
      _id: 'estimationItem:' + estimationId + ':' + estimationItemId,
      estimationId,
      id: estimationItemId,
      title
    }
    db.put(estimationItem).then(({rev}) => { estimationItem._rev = rev })
    commit('ADD_ESTIMATION_ITEM', estimationItem)
    commit('START_ITEM_EDITING', estimationItem)
  },
  DELETE_ESTIMATION_ITEM ({commit}, item) {
    db.get(item._id).then(doc => db.remove(doc))
    commit('DELETE_ESTIMATION_ITEM', item)
  },
  START_ITEM_EDITING ({commit}, item) {
    commit('START_ITEM_EDITING', item)
  },
  STOP_ITEM_EDITING ({commit}, item) {
    commit('STOP_ITEM_EDITING', item)
  },
  UPDATE_ESTIMATION_ITEM ({commit}, {item, newData}) {
    let itemId = 'estimationItem:' + item.estimationId + ':' + item.id
    db.get(itemId).then(function (doc) {
      for (let key in newData) {
        if (newData.hasOwnProperty(key)) {
          doc[key] = newData[key]
        }
      }
      db.put(doc)
    })
    commit('UPDATE_ESTIMATION_ITEM', {item, newData})
    commit('STOP_ITEM_EDITING', item)
  }
}
