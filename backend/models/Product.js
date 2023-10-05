const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  rating: [
    {
      rate: {
        type: Number,
        required: false,
      },
      count: {
        type: Number,
        required: false,
      },
    },
  ],

  reviews: [
    {
      rate: {
        type: Number,
        required: false,
      },
      message: {
        type: String,
        required: false,
      },
    },
  ],
});

const productModel = mongoose.model("ProductModel", Product);
module.exports = productModel;
