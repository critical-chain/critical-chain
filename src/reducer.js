export default function (state = {}, action) {
  console.log(action);

  switch (action.type) {
    case 'SET_STATE':
      return action.state;
  }
  return state;
};
