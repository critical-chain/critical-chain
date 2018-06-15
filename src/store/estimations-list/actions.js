import PouchDB from "pouchdb";
import { Toast, Utils } from "quasar";

import router from "../../router";

const db = new PouchDB("estimations");
window.PouchDB = PouchDB; // TODO remove in production

export default {
  ADD_ESTIMATION ({commit}, {title}) {
    let estimationId = Utils.uid();
    let estimation = {_id: "estimation:" + estimationId, id: estimationId, title, items: []};
    db.put(estimation);
    commit("ADD_ESTIMATION", estimation);
    router.push({name: "estimation", params: {id: estimation.id}});
  },
  DELETE_ESTIMATION ({commit}, estimation) {
    db.get(estimation._id).then(doc => db.remove(doc));
    commit("DELETE_ESTIMATION", estimation);
  },
  LOAD_ESTIMATIONS ({commit, state}) {
    db.allDocs({include_docs: true, startkey: "estimation:", endkey: "estimation:\uffff"}).then(results => {
      if (!state.loaded) {
        let estimations = results.rows.map(estimation => estimation.doc);
        db.allDocs({include_docs: true, startkey: "estimationItem:", endkey: "estimationItem:\uffff"}).then(results => {
          results.rows.forEach(({doc}) => {
            let estimation = estimations.find(e => e.id === doc.estimationId);
            doc.isEditing = false;
            if (estimation) { estimation.items.push(doc); }
          });
          commit("LOAD_ESTIMATIONS", estimations);
          commit("MARK_AS_LOADED");
        });
      } else {
        commit("ALREADY_LOADED");
      }
    });
  },
  ADD_ESTIMATION_ITEM ({commit, state, getters}, {estimationId, title}) {
    let estimation = state.estimations.find(e => e.id === estimationId);
    let position = getters.getNextPosition(estimationId);
    let estimationItemId = Utils.uid();
    let item = {
      _id: "estimationItem:" + estimationId + ":" + estimationItemId,
      estimationId,
      id: estimationItemId,
      position,
      title
    };
    db.put(item).then(({rev}) => { item._rev = rev; });
    commit("ADD_ESTIMATION_ITEM", {estimation, item});
    commit("START_ITEM_EDITING", item);
  },
  DELETE_ESTIMATION_ITEM ({commit}, item) {
    db.get(item._id).then(doc => db.remove(doc)).then(({rev}) => { item._rev = rev; });
    commit("DELETE_ESTIMATION_ITEM", item);
    Toast.create({
      html: `"<strong>${item.title}</strong>" has been deleted.`,
      icon: "delete",
      button: {
        label: "Undo",
        handler () {
          db.put(item);
          commit("UNDO_ITEM_DELETION", item);
        }
      }
    });
  },
  START_ITEM_EDITING ({commit}, item) {
    commit("START_ITEM_EDITING", item);
  },
  STOP_ITEM_EDITING ({commit}, item) {
    commit("STOP_ITEM_EDITING", item);
  },
  UPDATE_ESTIMATION_ITEM ({commit}, {item, newData}) {
    let itemId = "estimationItem:" + item.estimationId + ":" + item.id;
    db.get(itemId).then(function (doc) {
      for (let key in newData) {
        if (newData.hasOwnProperty(key)) {
          doc[key] = newData[key];
        }
      }
      db.put(doc);
    });
    commit("UPDATE_ESTIMATION_ITEM", {item, newData});
    commit("STOP_ITEM_EDITING", item);
  }
};
