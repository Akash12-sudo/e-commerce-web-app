export const initialState = 0;

const itemCount = (state = initialState, action) => {
  switch (action.type) {
    case "getCount":
      return action.payload;
    case "increment":
      return state + 1;
    case "decrement":
      return Math.max(0, state - 1);
    default:
      return 1;
  }
};

export default itemCount;
