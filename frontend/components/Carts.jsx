import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Carts = () => {
  const user = useSelector((state) => state.getUser);
  const dispatch = useDispatch();

  console.log("Current User...");

  const [myCart, setMyCart] = useState(user.cart);
  console.log(myCart);

  const removeItemHandler = async (event) => {
    let itemId = event.target.id;
    const idx = user.cart.findIndex((obj) => obj.itemId === itemId);
    console.log(idx);

    try {
      const res = await fetch("http://127.0.0.1:8000/removeItem", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });

      const data = await res.json();
      console.log(data);
      useDispatch({ type: "data", payload: data });
    } catch (err) {
      console.log(err);
    }

    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="flex flex-row drop-shadow-lg shadow-sm p-2 w-full justify-center h-full items-center my-10">
          <p className="text-3xl font-sans font-bold">Welcome,</p>
          <p className="text-3xl text-blue-700 font-sans font-bold ml-10">
            {user.name}
          </p>
        </div>
        {user.cart && user.cart.length > 0 ? (
          <>
            <p className="text-2xl underline font-sans font-semibold my-5">
              Your Cart Items:
            </p>
            {user.cart.map((cardItem, id) => (
              <div className="flex flex-row w-full justify-around items-center ">
                <div className="flex flex-row w-4/5 h-full items-center justify-evenly">
                  <p className="rounded-full p-3 bg-blue-800/75 drop-shadow-lg text-white text-2xl font-semibold font-sans w-[4rem] h-[4rem] text-center my-auto items-center ">
                    {cardItem.count}
                  </p>
                  <div className="my-4 flex flex-row jsutify-left w-3/4 h-auto p-3 border border-solid border-slate-700 rounded-lg shadow-lg">
                    <div className="w-1/3 h-full shadow-lg">
                      <img
                        src={cardItem.image}
                        alt={cardItem.title}
                        className="w-32 h-32 object-cover mb-2 ml-auto mr-auto"
                      />
                    </div>
                    <div className="w-2/5 justify-center flex flex-col mx-4 p-3 ">
                      <p className="text-2xl font-semibold font-sans italic">
                        {cardItem.title}
                      </p>
                      <p className="text-2xl font-bold text-green-700/75 drop-shadow-md">
                        {cardItem.price}
                      </p>
                    </div>
                    <div className="w-1/3 justify-center flex flex-col mx-4">
                      <Link
                        to={`/products/${cardItem.itemId}`}
                        className="p-3 w-3/4 text-center rounded-lg shadow-md text-white font-sans font-semibold bg-cyan-800/75"
                      >
                        See details
                      </Link>
                      <button
                        id={cardItem.itemId}
                        onClick={removeItemHandler}
                        className="p-3 my-2 w-3/4 text-center rounded-lg shadow-md text-white font-sans font-semibold bg-red-500/75"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-1/5 h-full flex justify-start mx-2">
                  <Link
                    id={cardItem.itemId}
                    value={cardItem.count}
                    to={`/purchase/${cardItem.itemId}`}
                    onClick={(event) => {
                      dispatch({
                        type: "buy",
                        payload: { id: event.target.id, count: cardItem.count },
                      });
                    }}
                    className="w-1/2 py-2 bg-yellow-600 text-center text-shadow rounded-lg text-white text-1xl font-mono"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-3xl font-semibold font-sans text-slate-800">
            Your cart is empty :(
          </p>
        )}
      </div>
    </>
  );
};

export default Carts;
