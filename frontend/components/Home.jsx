import React, { useState, useEffect } from "react";
import { products } from "../database/Data";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productList } from "../actions";
import StarRating from "./StarRating";
import { toolTipAlter } from "../actions";

const Home = () => {
  const list = useSelector((state) => state.Product);
  const visible = useSelector((state) => state.toolTip);
  const searchlist = useSelector((state) => state.searchList);
  const dispatch = useDispatch();

  console.log(list);
  console.log(searchlist);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 my-4 mx-2">
        {searchlist.length > 0
          ? searchlist.map((myProduct, key) => (
              <Link to={`/products/${myProduct._id}`}>
                <div
                  key={myProduct.key}
                  className="border h-full p-4 rounded-lg shadow-md flex flex-col transition duration-700 ease-in-out hover:scale-105"
                >
                  <img
                    src={myProduct.image}
                    alt={myProduct.title}
                    className="w-32 h-32 object-cover mb-2 ml-auto mr-auto"
                  />
                  <h3 className="text-lg font-semibold hover:text-orange-600">
                    {myProduct.title}
                  </h3>
                  <div className="flex flex-row">
                    <StarRating ratingValue={myProduct.rating[0].rate} />
                    <p>{myProduct.rating[0].count}</p>
                  </div>
                  <p className="text-green-500 text-shadow-md text-2xl font-bold font-sans ">
                    ${myProduct.price}
                  </p>
                </div>
              </Link>
            ))
          : list.map((product, key) => (
              <Link to={`/products/${product._id}`}>
                <div
                  key={product.key}
                  className="border h-full p-4 rounded-lg shadow-md flex flex-col transition duration-700 ease-in-out hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-32 h-32 object-cover mb-2 ml-auto mr-auto"
                  />
                  <h3 className="text-lg font-semibold hover:text-orange-600">
                    {product.title}
                  </h3>
                  <div className="flex flex-row">
                    <StarRating ratingValue={product.rating[0].rate} />
                    <p>{product.rating[0].count}</p>
                  </div>
                  <p className="text-green-500 text-shadow-md text-2xl font-bold font-sans ">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
      </div>
      <div className="flex flex-row bg-slate-800 w-full h-64 mt-10 text-white font-sans items-center justify-evenly">
        <p>About</p>
        <p>Contact Us</p>
        <p>Help?</p>
      </div>
    </>
  );
};

export default Home;
