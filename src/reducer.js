import Immutable from 'immutable';


function addEstimationItem(state, estimationId, title) {
  var estimationId = parseInt(estimationId);
  return state.update('estimations', (estimations) => estimations.map((estimation) => {
    if(estimation.get('id')===estimationId) {
      var id = estimation.get('steps', Immutable.List([])).last().get('id', 0) + 1;
      return estimation.update('steps', list => list.push(Immutable.Map({
        id, title, value: 0
      })));
    } else {
      return estimation;
    }
  }));
}

export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return Immutable.fromJS(action.state);
    case 'ADD_ESTIMATION_ITEM':
      return addEstimationItem(state, action.estimationId, action.itemTitle);
    default:
      return state;
  }
};
