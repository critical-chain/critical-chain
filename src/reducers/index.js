import Immutable from 'immutable';


function addEstimation(state, estimationTitle) {
  var estimationId = state.get('estimations').last().get('id', 0) + 1;
  return state.update('estimations', (estimations) => estimations.push(
    Immutable.Map({id: estimationId, title: estimationTitle, steps: Immutable.List([])})
  ));
}

function addEstimationItem(state, estimationId, title) {
  var estimationId = parseInt(estimationId);
  return state.update('estimations', (estimations) => estimations.map((estimation) => {
    if (estimation.get('id') === estimationId) {
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
    case 'ADD_ESTIMATION':
      return addEstimation(state, action.estimationTitle);
    case 'ADD_ESTIMATION_ITEM':
      return addEstimationItem(state, action.estimationId, action.itemTitle);
    default:
      return state;
  }
};
