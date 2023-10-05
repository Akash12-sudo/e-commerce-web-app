export const initialState = {};

const authUser = (state = initialState, action) => {
  switch (action.type) {
    case "authData":
      return action.payload;
    default:
      return state;
  }
};

export default authUser;
