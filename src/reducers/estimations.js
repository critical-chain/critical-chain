import Immutable from 'immutable';


function addEstimation(estimations, estimationTitle) {
  var estimationId = estimations.last().get('id', 0) + 1;
  return estimations.push(
    Immutable.Map({id: estimationId, title: estimationTitle, steps: Immutable.List([])})
  );
}

function addEstimationItem(estimations, estimationId, title) {
  var estimationId = parseInt(estimationId);
  return estimations.map((estimation) => {
    if (estimation.get('id') === estimationId) {
      var id = (estimation.get('steps', Immutable.List([])).last()||Immutable.Map({})).get('id', 0) + 1;
      return estimation.update('steps', list => list.push(Immutable.Map({
        id, title, value: 0
      })));
    } else {
      return estimation;
    }
  });
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
