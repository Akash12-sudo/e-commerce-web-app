export const initialState = {};

const buyState = (state = initialState, action) => {
  switch (action.type) {
    case "buy":
      return action.payload;
    default:
      return state;
  }
};

export default buyState;
