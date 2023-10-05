export const initialState = false;

const toolTip = (state = initialState, action) => {
  switch (action.type) {
    case "alter":
      return action.payload;
    default:
      return state;
  }
};

export default toolTip;
