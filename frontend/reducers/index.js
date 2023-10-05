import { combineReducers } from "redux";
import authenticateLogin from "./authenticateLogin";
import getUser from "./getUser";
import getUserCart from "./getUserCart";
import buyState from "./buyState";
import itemCount from "./itemCount";
import Product from "./Product";
import toolTip from "./toolTip";
import authState from "./authState";
import authUser from "./authUser";
import searchList from "./searchList";

const rootReducer = combineReducers({
  authenticateLogin,
  getUser,
  getUserCart,
  buyState,
  itemCount,
  Product,
  toolTip,
  authState,
  authUser,
  searchList,
});

export default rootReducer;
