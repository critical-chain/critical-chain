export function estimationKey(estimationId) {
  return "estimation:" + estimationId;
}

export function estimationItemKey(estimationId, estimationItemId) {
  return "estimation_item:" + estimationId + ':' + estimationItemId;
}
