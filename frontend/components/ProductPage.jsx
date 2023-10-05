import React, { useState, useEffect } from "react";
import axios from "axios";
import { products } from "../database/Data";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { useSelector, useDispatch } from "react-redux";

const ProductPage = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.authenticateLogin);
  const dispatch = useDispatch();
  const productId = useParams();
  const reqID = productId.id;
  console.log(reqID);

  const [myProduct, setMyProduct] = useState(null);

  const fetchProduct = async () => {
    const obj = { reqID };
    console.log(obj);
    const { data } = await axios.post("http://127.0.0.1:8000/getproduct", obj, {
      withCredentials: true,
    });
    console.log(data);
    setMyProduct(data.product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const AddToCart = async (item) => {
    console.log(item);
    try {
      const response = await fetch("http://127.0.0.1:8000/addToCart", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      console.log(response.status);
      if (response.status == 201) {
        const data = await response.json();
        console.log("updated user");
        console.log(data);
        dispatch({ type: "data", payload: data });
        alert("Item added to cart!!");
      }
    } catch (err) {
      console.log(err);
      alert("Unable to add to cart");
    }
  };

  const cartHandler = () => {
    if (!loginState) return alert("Please signin first!!!");

    const item = {
      itemId: myProduct._id.toString(),
      title: myProduct.title.toString(),
      price: myProduct.price.toString(),
      image: myProduct.image.toString(),
    };

    AddToCart(item);
  };

  const buyHandler = () => {
    if (!loginState) return alert("Please signin first!!!");
    dispatch({
      type: "buy",
      payload: { id: myProduct.id, count: 1 },
    });
    navigate(`/purchase/${myProduct.id}`);
  };

  return (
    <>
      {myProduct ? (
        <div key={myProduct.id} className="flex flex-col">
          <div className="flex flex-row justify-between my-[5rem] items-center w-full h-full ">
            <div className="w-full h-full">
              <img
                src={myProduct.image}
                alt={myProduct.title}
                className="w-64 h-full object-cover mb-2 ml-auto mr-auto"
              />
            </div>
            <div className="flex flex-col w-5/6 mx-10 py-6 px-4 border border-solid border-gray-200 drop-shadow-sm rounded-lg">
              <h3 className="text-3xl font-semibold font-sans">
                {myProduct.title}
              </h3>
              <div className="flex flex-row align-center p-2 items-center">
                <p className="text-2xl font-sans">{myProduct.rating[0].rate}</p>
                <StarRating ratingValue={myProduct.rating[0].rate} />
                <p className="ml-[2rem] text-[1.2rem] font-sans text-cyan-800">
                  {myProduct.rating[0].count} ratings
                </p>
              </div>
              <hr />
              <p className="text-green-600 text-shadow-md text-[2rem] font-bold font-sans ">
                ${myProduct.price}
              </p>
              <div className="mt-10 border-gray rounded-xl bg-gray-100">
                <p className="ml-auto mr-auto p-4 text-1xl font-sans">
                  {myProduct.description}
                </p>
              </div>
              <div className="mt-5 flex flex-row justify-start items-center">
                <p className="text-[1.2rem] text-red-600 font-sans">
                  Category:
                </p>
                <p className="mx-10 text-[1.2rem] font-sans font-semibold">
                  {myProduct.category}
                </p>
              </div>
              <div className="flex flex-row justify-evenly mt-[4rem] h-full">
                <button
                  className="text-black bg-yellow-300 hover:bg-yellow-400 rounded-3xl p-3 text-[1.1rem] font-sans w-1/4 h-full"
                  onClick={cartHandler}
                >
                  Add to Cart
                </button>
                <button
                  className="text-black bg-orange-300 hover:bg-orange-400 rounded-3xl p-3 text-[1.1rem] font-sans w-1/4 h-full"
                  onClick={buyHandler}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-3xl font-bold">
          {/* The product you are looking is not available ! */}
        </div>
      )}
    </>
  );
};

export default ProductPage;
