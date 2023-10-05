import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../database/Data";
import { useSelector, useDispatch } from "react-redux";
import StarRating from "./StarRating";

const BuyPage = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.authenticateLogin);
  const buyState = useSelector((state) => state.buyState);
  const user = useSelector((state) => state.getUser);
  const dispatch = useDispatch();

  console.log(buyState);
  const reqID = buyState.id;
  console.log(reqID);

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    const obj = { reqID };
    console.log(obj);
    const { data } = await axios.post("http://127.0.0.1:8000/getproduct", obj, {
      withCredentials: true,
    });
    console.log(data);
    setProduct(data.product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const [itemCount, setItemCount] = useState(buyState.count);
  console.log(itemCount);

  const [mode, setMode] = useState("None");
  const [modeSelected, setModeSelected] = useState(false);

  const modeHandler = (event) => {
    setMode(event.target.value);
    setModeSelected(true);
  };

  const buyHandler = async (event) => {
    if (!modeSelected) {
      return alert("Select a payment mode!!");
    }
    let totalCost = itemCount * product.price;
    let address = user.address;

    if (!address.length) return alert("Please provide the delivery address!!");

    const obj = {
      itemId: buyState.id,
      title: product.title,
      quantity: itemCount,
      cost: totalCost,
      payment_mode: mode,
      address: address,
    };

    console.log(obj);

    try {
      const res = await fetch("http://127.0.0.1:8000/buyHandler", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      console.log(res.status);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {loginState && product ? (
        <>
          <div className="flex flex-col justify-center w-full h-full my-10 mx-2">
            <div className="mx-2 w-5/6 h-full items-center ">
              <p className="text-4xl font-semibold font-sans antialiased">
                {product.title}
                <hr />
              </p>
            </div>
            <div className="w-4/5 flex flex-row justify-between ">
              <div className="my-5 flex justify-center items-center h-128 w-full">
                <img
                  src={product.image}
                  alt="image"
                  className="w-full object-cover h-128 w-96"
                />
              </div>
              <div className="my-10 flex flex-col items-left  h-full w-full">
                <div className="flex flex-row align-center p-2 items-center">
                  <p className="text-3xl font-sans">{product.rating[0].rate}</p>
                  <StarRating ratingValue={product.rating[0].rate} />
                  <p className="ml-[2rem] text-[1.5rem] font-sans text-cyan-800">
                    {product.rating[0].count} ratings
                  </p>
                </div>

                <div className="my-5 border-gray rounded-xl bg-gray-100">
                  <p className="ml-auto mr-auto p-4 text-[1.3rem] text-shadow-lg font-sans">
                    {product.description}
                  </p>
                </div>
                <div className="mt-5 flex flex-row justify-start items-center">
                  <p className="text-[1.5rem] text-red-600 font-sans">
                    Category:
                  </p>
                  <p className="mx-10 text-[1.5rem] font-sans font-semibold">
                    {product.category}
                  </p>
                </div>
                <div className="mt-5 flex flex-row justify-start items-center">
                  <p className="text-[1.5rem] text-cyan-800 font-sans font-semibold">
                    Quantity:
                  </p>
                  <div className="flex flex-row w-1/2 items-center">
                    <p className="ml-10 mr-5 text-[1.5rem] font-sans font-semibold text-shadow">
                      {itemCount}
                    </p>
                    <button
                      id="increment"
                      className="px-4 text-2xl text-white bg-gray-700 rounded-tl-md rounded-bl-md"
                      onClick={() => setItemCount(itemCount + 1)}
                    >
                      +
                    </button>
                    <button
                      id="decrement"
                      className="px-4 text-2xl text-white bg-gray-800 rounded-tr-md rounded-br-md"
                      onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="mt-5 flex flex-row justify-start items-center">
                  <p className="text-[1.5rem] text-green-800/75 font-sans font-semibold">
                    Cost:
                  </p>
                  <p className="ml-10 text-[1.5rem] font-sans font-semibold text-blue-700">
                    ${product.price * itemCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="my-5 mx-2 flex flex-col w-4/5 justify-evenly">
              <div className="flex w-full items-center">
                <p className="font-bold text-[1.6rem] font-sans text-shadow-lg">
                  Shipping Address
                </p>
              </div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="mt-5 w-full flex w-full bg-gray-100 px-2 py-3 rounded-lg border-solid border-2 border-slate-400/75 shadow-lg">
                  <p className="font-semibold font-sans text-[1.1rem] text-slate-700">
                    {user.address}
                  </p>
                </div>
                <Link
                  to={`/profile/${user._id}`}
                  className="mx-2 py-3 px-5 mt-5 bg-yellow-600 rounded-lg font-sans shadow-lg text-1xl "
                >
                  Change
                </Link>
              </div>
            </div>
            <div className="flex flex-col w-4/5 my-5 mx-2 justify-center">
              <div className="flex w-full items-center">
                <p className="font-bold text-[1.6rem] font-sans text-shadow-lg">
                  Mode of Payment
                </p>
              </div>
              <div className="flex flex-col w-full shadow-sm p-2">
                <label className="my-1 flex flex-row">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="cashOnDelivery"
                    onChange={modeHandler}
                  />
                  <p className="mx-5 text-[1.1rem] font-semibold font-sans text-gray-800">
                    Cash on Delivery
                  </p>
                </label>

                <label className="my-1 flex flex-row">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="upiApps"
                    onChange={modeHandler}
                  />
                  <p className="mx-5 text-[1.1rem] font-semibold font-sans text-gray-800">
                    UPI Apps
                  </p>
                </label>

                <label className="my-1 flex flex-row">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="debitCards"
                    onChange={modeHandler}
                  />
                  <p className="mx-5 text-[1.1rem] font-semibold font-sans text-gray-800">
                    Cards
                  </p>
                </label>
              </div>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <Link
                to="/"
                className="mx-2 px-10 py-3 bg-red-800 rounded-lg shadow-lg text-white font-sans text-center text-[1.3rem]"
              >
                Go Back
              </Link>
              <button
                className="mx-2 px-10 py-3 bg-yellow-600 rounded-lg shadow-lg text-white font-sans text-center text-[1.3rem]"
                onClick={buyHandler}
              >
                Purchase
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>Error</div>
      )}
    </>
  );
};

export default BuyPage;

// id: 1,
// title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
// price: 109.95,
// description:
//   "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
// category: "men's clothing",
// image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
// rating: {
//   rate: 3.9,
//   count: 120,
// },
