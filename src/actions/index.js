export default {
  addEstimationItem: (estimationId, itemTitle) => {
    return {type: 'ADD_ESTIMATION_ITEM', estimationId, itemTitle};
  }
}
