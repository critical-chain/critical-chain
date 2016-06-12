export function addEstimation(estimationTitle) {
  return (dispatch, getState) => {
    dispatch({type: 'ADD_ESTIMATION', estimationTitle});
    return getState().estimations.last().get('id');
  }
}

export function addEstimationItem(estimationId, itemTitle) {
  return (dispatch, getState) => {
    dispatch({type: 'ADD_ESTIMATION_ITEM', estimationId, itemTitle});
    return getState().estimations
      .find(estimation => estimation.get('id')===estimationId)
      .get('steps').last().get('id')
  }
}
export function updateEstimationItem(estimationId, estimationItemId, newValues) {
  return (dispatch) => {
    return dispatch({type: 'UPDATE_ESTIMATION_ITEM', estimationId, estimationItemId, newValues})
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
