export const initialState = [];

const searchList = (state = initialState, action) => {
  switch (action.type) {
    case "searched":
      return action.payload;
    default:
      return state;
  }
};

export default searchList;
