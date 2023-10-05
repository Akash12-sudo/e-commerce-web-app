export const initialState = [];

const Product = (state = initialState, action) => {
  switch (action.type) {
    case "list":
      return action.payload;
    default:
      return state;
  }
};

export default Product;
