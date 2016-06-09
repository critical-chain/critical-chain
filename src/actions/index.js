export function addEstimation(estimationTitle) {
  return {type: 'ADD_ESTIMATION', estimationTitle}
}

export function addEstimationItem(estimationId, itemTitle) {
  return {type: 'ADD_ESTIMATION_ITEM', estimationId, itemTitle};
}
