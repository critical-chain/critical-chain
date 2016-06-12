import Immutable from 'immutable';

import uuid from 'uuid';


function addEstimation(estimations, estimationTitle) {
  var id = uuid.v4();
  return estimations.push(
    Immutable.Map({id: estimationId, title: estimationTitle, steps: Immutable.List([])})
  );
}

function addEstimationItem(estimations, estimationId, title) {
  return estimations.map((estimation) => {
    if (estimation.get('id') === estimationId) {
      var estimationItemId = uuid.v4();
      return estimation.update('steps', list => list.push(Immutable.Map({
        estimationItemId, title, value: 0
      })));
    } else {
      return estimation;
    }
  });
}

function updateEstimationItem(estimations, estimationId, estimationItemId, newValues) {
  return estimations.map((estimation) => {
    if (estimation.get('id') === estimationId) {
      return estimation.update('steps', steps => steps.map(step => {
        if (step.get('id') === estimationItemId) {
          return step.update('title', () => newValues.title).update('value', () => newValues.value);
        } else {
          return step;
        }
      }));
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

function stopEstimationItemsEditing(estimations, estimationId) {
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
    case 'UPDATE_ESTIMATION_ITEM':
      return updateEstimationItem(state, action.estimationId, action.estimationItemId, action.newValues);
    case 'START_ESTIMATION_ITEM_EDITING':
      return startEstimationItemEditing(state, action.estimationId, action.estimationItemId);
    case 'STOP_ESTIMATION_ITEMS_EDITING':
      return stopEstimationItemsEditing(state, action.estimationId);
    default:
      return state;
  }
};
