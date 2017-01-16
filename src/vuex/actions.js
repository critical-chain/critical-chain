import PouchDB from 'pouchdb'
import uuid from 'uuid'

const db = new PouchDB('estimations')
window.PouchDB = PouchDB // TODO remove in production

export default {
  ADD_ESTIMATION({commit}, {title}) {
    let estimationId = uuid.v4();
    let estimation = {_id: 'estimation:'+estimationId, id: estimationId, title, items: []}
    db.put(estimation)
    commit('ADD_ESTIMATION', estimation)
  }
}
