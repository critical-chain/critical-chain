import uuid from "uuid";
import Immutable from 'immutable';

export function addEstimation(estimationTitle) {
  var estimationId = uuid.v4();
  return (dispatch) => {
    dispatch({type: 'ADD_ESTIMATION', estimationId, estimationTitle});
    return estimationId;
  }
}

export function loadEstimation(estimationWithSteps) {
  return (dispatch) => {
    return dispatch({type: 'LOAD_ESTIMATION', estimation: estimationWithSteps})
  }
}

export function addEstimationItem(estimationId, itemTitle) {
  var estimationItemId = uuid.v4();

  return (dispatch, getState) => {
    var estimation = getState().estimations
      .find(estimation => estimation.get('id') === estimationId);
    var position = (
      (estimation
          .get('steps', Immutable.List())
          .maxBy(step => step.get('position', 0)) || Immutable.Map()
      ).get('position', 0)) + Math.random();

    dispatch({type: 'ADD_ESTIMATION_ITEM', estimationId, estimationItemId, itemTitle, position});
    return estimationItemId;
  }
}
export function updateEstimationItem(estimationId, estimationItemId, newValues) {
  return (dispatch) => {
    return dispatch({type: 'UPDATE_ESTIMATION_ITEM', estimationId, estimationItemId, newValues});
  }
}
export function deleteEstimationItem(estimationId, estimationItemId) {
  return (dispatch, getState) => {
    var steps = getState().estimations
      .find(estimation => estimation.get('id') === estimationId).get('steps');
    var position = steps.findIndex(estimationItem => estimationItem.get('id') === estimationItemId);
    var estimationItem = steps.get(position);
    dispatch({type: 'DELETE_ESTIMATION_ITEM', estimationId, estimationItemId});
    return {position, estimationItem};
  }
}

export function restoreEstimationItem(estimationId, position, estimationItem) {
  return (dispatch) => {
    return dispatch({type: 'RESTORE_ESTIMATION_ITEM', estimationId, position, estimationItem});
  }
}

export function startEstimationItemEditing(estimationId, estimationItemId) {
  return (dispatch) => {
    return dispatch({type: 'START_ESTIMATION_ITEM_EDITING', estimationId, estimationItemId});
  }
}
export function stopEstimationItemsEditing(estimationId) {
  return (dispatch) => {
    return dispatch({type: 'STOP_ESTIMATION_ITEMS_EDITING', estimationId});
  }
}

export function notifyAboutEstimationItemDeletion(estimationId, position, estimationItem) {
  return (dispatch) => {
    return dispatch({type: 'NOTIFY_ABOUT_ESTIMATION_ITEM_DELETION', estimationId, position, estimationItem})
  }
}
export function clearEstimationItemNotification() {
  return (dispatch) => {
    return dispatch({type: 'CLEAR_ESTIMATION_ITEM_NOTIFICATION'})
  }
}
export function setEstimationsListFilter(filterText) {
  return (dispatch) => {
    if(filterText === undefined || filterText === '') {
      return dispatch({type: 'CLEAR_ESTIMATIONS_LIST_FILTER'})
    } else {
      return dispatch({type: 'SET_ESTIMATIONS_LIST_FILTER', filterText})
    }
  }
}
