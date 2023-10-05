const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  profile_pic: {
    data: Buffer,
    contentType: String,
  },

  address: {
    type: String,
    required: false,
  },

  orders: [
    {
      itemId: {
        type: String,
        required: false,
      },

      title: {
        type: String,
        required: false,
      },

      quantity: {
        type: Number,
        required: false,
      },

      cost: {
        type: Number,
        required: false,
      },

      payment_mode: {
        type: String,
        required: false,
      },

      address: {
        type: String,
        required: false,
      },
    },
  ],

  cart: [
    {
      itemId: {
        type: String,
        required: false,
      },

      title: {
        type: String,
        required: false,
      },

      price: {
        type: String,
        required: false,
      },

      image: {
        type: String,
        required: false,
      },

      count: {
        type: Number,
        required: false,
      },
    },
  ],

  tokens: [
    {
      token: {
        type: String,
        required: false,
      },
    },
  ],
});

User.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
    next(); // Call next() to proceed with saving the document
  } catch (err) {
    next(err); // Call next() with the error to pass it to the error handler
  }
});

User.methods.validatePassword = async function (password) {
  try {
    console.log(`pass: ${this.password}`);
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  } catch (err) {
    console.error("Error while validating password:", err);
    return false;
  }
};

User.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { userId: this._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

User.methods.addToCart = async function (item) {
  console.log(item);
  try {
    let count = 1;

    const alreadyAdded = await this.cart.find(
      (obj) => obj.itemId === item.itemId
    );
    console.log(alreadyAdded);

    if (alreadyAdded) {
      count = alreadyAdded.count + 1;
      this.cart = this.cart.filter((obj) => obj.itemId !== item.itemId);
      this.cart = this.cart.concat({
        itemId: item.itemId,
        title: item.title,
        price: item.price,
        image: item.image,
        count: count,
      });
    } else {
      this.cart = this.cart.concat({
        itemId: item.itemId,
        title: item.title,
        price: item.price,
        image: item.image,
        count: 1,
      });
    }
    await this.save();
    return this;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const userModel = new mongoose.model("userModel", User);
module.exports = userModel;
