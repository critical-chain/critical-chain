export function addEstimation(estimationTitle) {
  return (dispatch, getState) => {
    dispatch({type: 'ADD_ESTIMATION', estimationTitle});
    return getState().estimations.last().get('id');
  }
}

export function addEstimationItem(estimationId, itemTitle) {
  return (dispatch) => {
    return dispatch({type: 'ADD_ESTIMATION_ITEM', estimationId, itemTitle})
  }
}
