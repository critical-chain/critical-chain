import Immutable from 'immutable';

function clearEstimationItemNotification(notifications) {
  return notifications.delete('estimationItem');
}
function notifyAboutEstimationItemDeletion(notifications, estimationId, position, estimationItem) {
  var estimationItem = estimationItem.delete('isEdited');
  return notifications.set('estimationItem', Immutable.Map({
    estimationId,
    position,
    estimationItem
  }))
}
export default function (state = {}, action) {
  switch (action.type) {
    case 'NOTIFY_ABOUT_ESTIMATION_ITEM_DELETION':
      return notifyAboutEstimationItemDeletion(state, action.estimationId, action.position, action.estimationItem);
    case 'CLEAR_ESTIMATION_ITEM_NOTIFICATION':
      return clearEstimationItemNotification(state);
    default:
      return state;
  }
}
