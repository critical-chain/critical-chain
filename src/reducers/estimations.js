import Immutable from 'immutable';

function addEstimation(estimations, estimationId, estimationTitle) {
  return estimations.push(
    Immutable.Map({id: estimationId, title: estimationTitle, steps: Immutable.List()})
  );
}

function loadEstimation(estimations, estimation) {
  var immutableEstimation = Immutable.fromJS(estimation);
  return estimations.push(immutableEstimation);
}


function addEstimationItem(estimations, estimationId, estimationItemId, title, position) {
  return estimations.map((estimation) => {
    if (estimation.get('id') === estimationId) {
      return estimation.update('steps', list => list.push(Immutable.Map({
        id: estimationItemId, title, position, value: 0, quantity: 1
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
          return step.update('title', () => newValues.title).
                      update('value', () => newValues.value).
                      update('quantity', () => newValues.quantity);
        } else {
          return step;
        }
      }));
    } else {
      return estimation;
    }
  });
}

function deleteEstimationItem(estimations, estimationId, estimationItemId) {
  return estimations.map((estimation) => {
    if (estimation.get('id') === estimationId) {
      return estimation.update('steps', steps => steps.filterNot(step => step.get('id') === estimationItemId));
    } else {
      return estimation;
    }
  });
}

function restoreEstimationItem(estimations, estimationId, position, estimationItem) {
  return estimations.map((estimation) => {
    if (estimation.get('id') === estimationId) {
      return estimation.update('steps',
        steps => steps.push(estimationItem).sortBy(step => step.get('position', 0))
      );
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
      return addEstimation(state, action.estimationId, action.estimationTitle);
    case 'LOAD_ESTIMATION':
      return loadEstimation(state, action.estimation);
    case 'ADD_ESTIMATION_ITEM':
      return addEstimationItem(state, action.estimationId, action.estimationItemId, action.itemTitle, action.position);
    case 'UPDATE_ESTIMATION_ITEM':
      return updateEstimationItem(state, action.estimationId, action.estimationItemId, action.newValues);
    case 'DELETE_ESTIMATION_ITEM':
      return deleteEstimationItem(state, action.estimationId, action.estimationItemId);
    case 'RESTORE_ESTIMATION_ITEM':
      return restoreEstimationItem(state, action.estimationId, action.position, action.estimationItem);
    case 'START_ESTIMATION_ITEM_EDITING':
      return startEstimationItemEditing(state, action.estimationId, action.estimationItemId);
    case 'STOP_ESTIMATION_ITEMS_EDITING':
      return stopEstimationItemsEditing(state, action.estimationId);
    default:
      return state;
  }
};
