import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { products } from "../database/Data";

const Orders = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.getUser);
  console.log(user);
  const orders = user.orders;
  console.log(orders);

  const cancelOrderHandler = async (event) => {
    let id = event.target.id;
    console.log(id);

    try {
      const res = await fetch("http://127.0.0.1:8000/cancelOrderHandler", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ OrderID: id }),
      });

      const data = await res.json();
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {user.orders ? (
        <div className="flex flex-col w-full h-full px-5 my-2">
          <p className="my-5 text-[2.5rem] font-sans font-semibold text-slate-800">
            Your Orders
          </p>
          <hr />
          {user.orders.map((order, index) => (
            <div className="my-5  flex flex-col justify-center w-full h-full">
              <div className="p-2 border border-solid border-gray-700 shadow-lg rounded-lg flex flex-col">
                <p className="text-[2rem] font-sans font-semibold m-1">
                  {order.title}
                </p>
                <hr />
                <div className="flex flex-row w-full justify-between">
                  <div className="flex flex-col w-full">
                    <div className="m-1 flex flex-row justify-start items-center">
                      <p className="text-[1.5rem] text-green-800/75 font-sans font-semibold">
                        Cost:
                      </p>
                      <p className="ml-2 text-[1.5rem] font-sans font-semibold text-blue-700">
                        ${order.cost}
                      </p>
                    </div>
                    <div className="m-1 flex flex-row justify-start items-center">
                      <p className="text-[1.5rem] text-red-900 font-sans font-semibold">
                        Qty:
                      </p>
                      <p className="ml-2 text-[1.5rem] font-sans font-semibold text-slate-700">
                        {order.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="m-1 flex flex-row justify-start items-center">
                      <p className="text-[1.5rem] text-green-800 font-sans font-semibold">
                        Shipping Address:
                      </p>
                      <p className="ml-2 text-[1.5rem] font-sans font-semibold text-blue-700 bg-gray-100 border border-solid border-gray-200 p-2 rounded-lg">
                        {order.address}
                      </p>
                    </div>
                    <div className="m-1 flex flex-row justify-start items-center">
                      <p className="text-[1.5rem] text-red-900 font-sans font-semibold">
                        Payment Mode:
                      </p>
                      <p className="ml-2 text-[1.5rem] font-sans font-semibold text-slate-700">
                        {order.payment_mode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4 flex flex-row items-center justify-center">
                <Link
                  to={`/products/${order.itemId}`}
                  className="m-2 px-4 py-2 bg-green-700 text-white rounded-lg font-sans "
                >
                  See Details
                </Link>
                <button
                  id={order._id}
                  className="m-2 px-4 py-2 bg-red-700/75 text-white rounded-lg font-sans "
                  onClick={cancelOrderHandler}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Orders</div>
      )}
    </div>
  );
};

export default Orders;
