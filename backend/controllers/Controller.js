const userModel = require("../models/Users.js");
const productModel = require("../models/Product.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const HomePage = async (req, res) => {
  return res.json({ message: "Welcome to e-commerce backend" });
};

const createAccount = async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log({ name, email, phone, password });

  try {
    const isOldUser = await userModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    console.log(isOldUser);

    if (isOldUser) {
      // console.log('Old User')
      return res
        .status(402)
        .send("User with following email or phone already exist");
    }

    const newUser = await userModel({
      name: name,
      email: email,
      phone: phone,
      password: password,
      profile_pic: "",
      address: "",
    });

    console.log(newUser);

    const result = await newUser.save(); // Change variable name to 'result'

    console.log(result);

    return res.status(201).send("User successfully registered");
  } catch (err) {
    console.log(err);
    return res.status(403).send(err);
  }
};

const loginAccount = async (req, res) => {
  try {
    // Extract the login key and value from the request body
    console.log(req.body);
    const password = req.body.password;

    const key = Object.keys(req.body)[0];
    const value = Object.values(req.body)[0];
    console.log(key, value);

    // Find the user based on the provided key (email or phone)
    const user = await userModel.findOne({ [key]: value });
    if (!user) {
      return res.status(401).send("User is not registered");
    }
    // console.log(user)

    // Compare the password provided in the request with the stored hashed password
    console.log(user.password);
    const isPasswordValid = user.validatePassword(password);

    if (!isPasswordValid) {
      console.log(isPasswordValid);
      return res.status(402).send("Incorrect password");
    }

    // Generate a JWT token for the user
    const token = await user.generateAuthToken();
    console.log({ token: token });
    console.log({ user: user });

    // Set the HTTP-only cookie in the response
    const cookie = res.cookie("accessToken", token, {
      sameSite: "lax",
      httpOnly: false,
      secure: false,
      expires: new Date(Date.now() + 14400000),
    });

    console.log(cookie);

    return res.status(201).send("User logged in successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

const checkUserLoggedIn = async (req, res) => {
  if (!req.userId) {
    return res.stauts(401).json({ error: "No user found" });
  }

  const user = await userModel.findOne({ _id: req.userId });

  if (!user) {
    console.log(`Can't find the user`);
    return res.status(401).send(`Can't find the user`);
  }

  res.status(201).json(user);
};

const addToCart = async (req, res) => {
  const { itemId, title, price, image } = req.body;
  console.log(req.body);

  try {
    if (!req.userId) {
      console.log(`User is not available!!!`);
      return res.stauts(401).json({ error: "No user found" });
    }

    const user = await userModel.findOne({ _id: req.userId });

    const updatedUser = await user.addToCart(req.body);

    console.log(updatedUser);

    console.log(`Item successfully added to cart`);
    return res.status(201).json(updatedUser);
  } catch (err) {
    console.log(`Item not added to cart`);
    console.log(err);
    return res.status(402).send(err);
  }
};

const signOut = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    console.log("logout successfully");
    return res.status(201).send("logout successfully");
  } catch (err) {
    console.log(err);
    return res.status(403).send(err);
  }
};

const addAddress = async (req, res) => {
  try {
    const value = Object.values(req.body);
    console.log(value[0]);

    if (!req.userId) {
      return res.status(404).send("No user is logged in currently!!!");
    }

    const id = req.userId;
    const user = await userModel.findOne({ _id: id });
    user.address = value[0];
    await user.save();

    console.log(user);
    return res.status(201).send("address updated successfully");
  } catch (err) {
    console.log(err);
    return res.status(402).json({ error: err });
  }
};

const addProfilePic = async (req, res) => {
  try {
    const value = Object.values(req.body);
    console.log(value[0]);

    if (!req.userId) {
      return res.status(404).send("No user is logged in currently!!!");
    }

    const id = req.userId;
    const user = await userModel.findOne({ _id: id });
    user.profile_pic = value[0];
    await user.save();

    console.log(user);
    return res.status(201).send("profile picture updated!!");
  } catch (err) {
    console.log(err);
    return res.status(402).json({ error: err });
  }
};

const removeItem = async (req, res) => {
  try {
    const id = req.userId;
    if (!id) return res.status(402).send("No user logged In!!");

    const user = await userModel.findOne({ _id: id });
    const itemId = Object.values(req.body)[0];

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].itemId === itemId) {
        user.cart[i].count = user.cart[i].count - 1;

        if (user.cart[i].count <= 0) {
          user.cart.splice(i, 1);
          break;
        }
      }
    }

    await user.save();

    console.log("Item removed successfully from cart");
    res.status(201).send("Item removed successfully from cart");
  } catch (err) {
    res.status(404).send("Item not removed from cart!!");
  }
};

const buyHandler = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.userId;
    if (!id) return res.status(402).send("No user logged In!!");

    const user = await userModel.findOne({ _id: id });
    console.log(user);

    user.orders = user.orders.concat(req.body);
    await user.save();

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(404).send({ error: "error" });
  }
};

const cancelOrderHandler = async (req, res) => {
  try {
    const id = req.userId;
    const orderID = Object.values(req.body)[0];
    console.log(orderID);

    if (!id) return res.status(402).send("No user logged In!!");

    const user = await userModel.findOne({ _id: id });

    user.orders = await user.orders.filter((obj) => obj._id != orderID);

    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err });
  }
};

// const oneTimeHandler = async (req, res) => {
//   try {
//     const id = req.userId;
//     if (!id) return res.status(402).send("No user logged in!!!");

//     const user = await userModel.findOne({ _id: id });
//     // console.log(req.body);
//     let items = req.body;

//     // console.log(items);

//     for (const item of items) {
//       console.log(item);
//       const product = new productModel({
//         title: item.title,
//         price: item.price,
//         category: item.category,
//         description: item.description,
//         image: item.image,
//         rating: item.rating,
//       });
//       await product.save();
//     }

//     return res.status(201).json(user);
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({ err: err });
//   }
// };

const fetchProductList = async (req, res) => {
  try {
    const list = await productModel.find({});

    const productList = list.map((item) => {
      return item;
    });

    return res.status(201).json(productList);
  } catch (err) {
    console.log({ err: err });
    return res.status(404).json({ error: err });
  }
};

const findProductHandler = async (req, res) => {
  try {
    console.log(req.body);
    const ID = Object.values(req.body)[0];
    console.log(ID);

    const product = await productModel.findOne({ _id: ID });

    console.log(product);

    res
      .status(201)
      .json({ error: "false", message: "success", product: product });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: true, message: "error occurred" });
  }
};

module.exports = {
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
};

// {
//   "email": "timcook@gmail.com",
//   "password": "timcook"
// }
