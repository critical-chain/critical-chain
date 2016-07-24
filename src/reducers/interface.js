import Immutable from 'immutable';

function clearEstimationItemNotification(interfaceState) {
  return interfaceState.delete('estimationItemNotification');
}
function notifyAboutEstimationItemDeletion(interfaceState, estimationId, position, estimationItem) {
  var estimationItem = estimationItem.delete('isEdited');
  return interfaceState.set('estimationItemNotification', Immutable.Map({
    estimationId,
    position,
    estimationItem
  }))
}
function clearEstimationsListFilter(interfaceState) {
  return interfaceState.delete('estimationsListFilter');
}
function setEstimationsListFilter(interfaceState, filterText) {
  return interfaceState.set('estimationsListFilter', filterText.toLowerCase());
}
export default function (state = {}, action) {
  switch (action.type) {
    case 'NOTIFY_ABOUT_ESTIMATION_ITEM_DELETION':
      return notifyAboutEstimationItemDeletion(state, action.estimationId, action.position, action.estimationItem);
    case 'CLEAR_ESTIMATION_ITEM_NOTIFICATION':
      return clearEstimationItemNotification(state);
    case 'CLEAR_ESTIMATIONS_LIST_FILTER':
      return clearEstimationsListFilter(state);
    case 'SET_ESTIMATIONS_LIST_FILTER':
      return setEstimationsListFilter(state, action.filterText);
    default:
      return state;
  }
}
