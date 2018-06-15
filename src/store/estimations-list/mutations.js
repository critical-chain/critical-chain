import Vue from "vue";

export default {
  ADD_ESTIMATION ({estimations}, estimation) {
    estimations.push(estimation);
  },
  DELETE_ESTIMATION ({estimations}, estimation) {
    let index = estimations.indexOf(estimation);
    estimations.splice(index, 1);
  },
  LOAD_ESTIMATIONS (state, estimations) {
    state.estimations = estimations;
  },
  MARK_AS_LOADED (state) {
    Vue.set(state, "loaded", true);
  },
  ALREADY_LOADED () {
  },
  ADD_ESTIMATION_ITEM (_, {estimation, item}) {
    estimation.items.push(item);
  },
  DELETE_ESTIMATION_ITEM ({estimations}, item) {
    Vue.set(item, "isEditing", false);
    let items = estimations.find(e => e.id === item.estimationId).items;
    let index = items.indexOf(item);
    items.splice(index, 1);
  },
  UNDO_ITEM_DELETION ({estimations}, item) {
    let items = estimations.find(e => e.id === item.estimationId).items;
    items.push(item);
  },
  START_ITEM_EDITING (_, item) {
    Vue.set(item, "isEditing", true);
  },
  STOP_ITEM_EDITING (_, item) {
    Vue.set(item, "isEditing", false);
  },
  UPDATE_ESTIMATION_ITEM (_, {item, newData}) {
    for (var key in newData) {
      if (newData.hasOwnProperty(key)) {
        Vue.set(item, key, newData[key]);
      }
    }
  }
};
