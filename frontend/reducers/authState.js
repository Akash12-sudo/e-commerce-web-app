export const initialState = false;

const authState = (state = initialState, action) => {
  switch (action.type) {
    case "authLogin":
      return true;
    case "authLogout":
      return false;
    default:
      return state;
  }
};

export default authState;
