import Immutable from 'immutable';


function addEstimation(estimations, estimationTitle) {
  var estimationId = estimations.last().get('id', 0) + 1;
  return estimations.push(
    Immutable.Map({id: estimationId, title: estimationTitle, steps: Immutable.List([])})
  );
}

function addEstimationItem(estimations, estimationId, title) {
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

function startEstimationItemEditing(estimations, estimationId, estimationItemId) {
  return estimations.map(estimation => {
    if (estimation.get('id') === estimationId) {
      return estimation.update('steps', steps => steps.map(step =>
        step.update('isEdited', () => step.get('id') === estimationItemId)
      ));
    } else {
      return estimation;
    }
  });
}

function stopEstimationItemEditing(estimations, estimationId, estimationItemId) {
  return estimations.map(estimation => {
    if (estimation.get('id') === estimationId) {
      return estimation.update('steps', steps => steps.map(step =>
        step.update('isEdited', () => false)
      ));
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
    case 'START_ESTIMATION_ITEM_EDITING':
      return startEstimationItemEditing(state, action.estimationId, action.estimationItemId);
    case 'STOP_ESTIMATION_ITEM_EDITING':
      return stopEstimationItemEditing(state, action.estimationId, action.estimationItemId);
    default:
      return state;
  }
};
