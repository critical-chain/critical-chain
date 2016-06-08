import Immutable from 'immutable';


function addEstimationItem(state, estimationId, itemTitle) {
  debugger;
  return state;
}

export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return Immutable.fromJS(action.state);
    case 'ADD_ESTIMATION_ITEM':
      addEstimationItem(state, action.estimationId, action.itemTitle);
    default:
      return state;
  }
};
