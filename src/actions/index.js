export default {
  addEstimation: (estimationTitle) => {
    return {type: 'ADD_ESTIMATION', estimationTitle}
  },
  addEstimationItem: (estimationId, itemTitle) => {
    return {type: 'ADD_ESTIMATION_ITEM', estimationId, itemTitle};
  }
}
