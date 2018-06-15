export const listEstimations = ({ estimations }) => estimations;
export const getEstimation = ({ estimations }) => (uuid) => (estimations.find(e => e.id === uuid) || { items: [] });
export const getEstimationItems = (_, { getEstimation }) => (uuid) => getEstimation(uuid).items;
export const getNextPosition = (_, { getEstimationItems }) => (uuid) => {
  let items = getEstimationItems(uuid);
  if (items.length > 0) {
    return Math.max(...items.map(i => (i.position || 0))) + Math.random();
  } else {
    return Math.random();
  }
};
export const getEditedItem = (_, { getEstimation }) => (uuid) => getEstimation(uuid).items.find(item => item.isEditing);
