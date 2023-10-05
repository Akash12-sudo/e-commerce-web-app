export const userLoggedIn = () => {
  return {
    type: "LOGIN",
  };
};

export const userLoggedOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const userDetails = (userData) => {
  return {
    type: "data",
    payload: userData,
  };
};

export const userCartData = (data) => {
  return {
    type: "cart",
    payload: data,
  };
};

export const productList = (data) => {
  return {
    type: "list",
    payload: data,
  };
};

export const toolTipAlter = (state) => {
  return {
    type: "alter",
    payload: state,
  };
};
