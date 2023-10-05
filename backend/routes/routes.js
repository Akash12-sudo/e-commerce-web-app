const express = require("express");
const passport = require("passport");
const router = express.Router();
require("dotenv").config();

const {
  HomePage,
  createAccount,
  loginAccount,
  checkUserLoggedIn,
  addToCart,
  signOut,
  addAddress,
  addProfilePic,
  removeItem,
  buyHandler,
  cancelOrderHandler,
  fetchProductList,
  findProductHandler,
} = require("../controllers/Controller.js");
const authenticateUser = require("../middlewares/authenticateUser.js");

router.get("/", HomePage);
router.post("/register", createAccount);
router.post("/signin", loginAccount);
router.get("/authenticate", authenticateUser, checkUserLoggedIn);
router.post("/addToCart", authenticateUser, addToCart);
router.get("/signout", signOut);
router.post("/addAddress", authenticateUser, addAddress);
router.post("/addProfilePic", authenticateUser, addProfilePic);
router.post("/removeItem", authenticateUser, removeItem);
router.post("/buyHandler", authenticateUser, buyHandler);
router.post("/cancelOrderHandler", authenticateUser, cancelOrderHandler);
router.get("/fetchProductList", fetchProductList);
router.post("/getproduct", findProductHandler);

module.exports = router;
