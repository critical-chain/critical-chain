import {estimationKey, estimationItemKey} from '../utils/collation';

function addEstimation(pouchDB, estimationId, estimationTitle) {
  pouchDB.put({_id: estimationKey(estimationId), title: estimationTitle});
  return pouchDB;
}

function addEstimationItem(pouchDB, estimationId, estimationItemId, title, position) {
  pouchDB.put({_id: estimationItemKey(estimationId, estimationItemId), title, position, value: 0, quantity: 1});
  return pouchDB;
}
function updateEstimationItem(pouchDB, estimationId, estimationItemId, newValues) {
  pouchDB.get(estimationItemKey(estimationId, estimationItemId)).then(function (doc) {
    doc.title = newValues.title;
    doc.value = newValues.value;
    doc.quantity = newValues.quantity;
    return pouchDB.put(doc);
  });
  return pouchDB;
}

function deleteEstimationItem(pouchDB, estimationId, estimationItemId) {
  pouchDB.get(estimationItemKey(estimationId, estimationItemId)).then(function (doc) {
    doc._deleted = true;
    return pouchDB.put(doc);
  });
  return pouchDB;
}

function restoreEstimationItem(pouchDB, estimationId, estimationItem) {
  pouchDB.put({_id: estimationItemKey(estimationId, estimationItem.get('id')),
    title: estimationItem.get('title'), position: estimationItem.get('position'),
    value: estimationItem.get('value'), quantity: estimationItem.get('quantity')});
  return pouchDB;
}

export default function (pouchDB = {}, action) {
  if (action.transient) {
    return pouchDB;
  }
  switch (action.type) {
    case 'ADD_ESTIMATION':
      return addEstimation(pouchDB, action.estimationId, action.estimationTitle);
    case 'ADD_ESTIMATION_ITEM':
      return addEstimationItem(pouchDB, action.estimationId, action.estimationItemId, action.itemTitle, action.position);
    case 'UPDATE_ESTIMATION_ITEM':
      return updateEstimationItem(pouchDB, action.estimationId, action.estimationItemId, action.newValues);
    case 'DELETE_ESTIMATION_ITEM':
      return deleteEstimationItem(pouchDB, action.estimationId, action.estimationItemId);
    case 'RESTORE_ESTIMATION_ITEM':
      return restoreEstimationItem(pouchDB, action.estimationId, action.estimationItem);
    default:
      return pouchDB;
  }
};
