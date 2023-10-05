import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from "../images/search.png";
import ShoppingCart from "../images/shopping-cart.png";
import { Link } from "react-router-dom";
import { userLoggedIn, userDetails } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { toolTipAlter } from "../actions";
import UserToolTip from "./UserToolTip";

const NavigationBar = () => {
  const loginState = useSelector((state) => state.authenticateLogin);
  const userState = useSelector((state) => state.getUser);
  const visible = useSelector((state) => state.toolTip);
  const authState = useSelector((state) => state.authState);
  const list = useSelector((state) => state.Product);

  const dispatch = useDispatch();

  const [searchedItem, setSearchedItem] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const searchChangeHandler = (event) => {
    setSearchedItem(event.target.value);
    console.log(searchedItem);

    const itemlist = list.filter(
      (product) =>
        product.category.toLowerCase().includes(searchedItem.toLowerCase()) ||
        product.title.toLowerCase().includes(searchedItem.toLowerCase())
    );

    if (itemlist.length > 0) {
      dispatch({ type: "searched", payload: itemlist });
    }
  };

  const searchButton = (event) => {
    console.log(searchedItem);

    const itemlist = list.filter(
      (product) =>
        product.category.toLowerCase().includes(searchedItem.toLowerCase()) ||
        product.title.toLowerCase().includes(searchedItem.toLowerCase())
    );

    console.log(itemlist);
    if (itemlist.length > 0) {
      dispatch({ type: "searched", payload: itemlist });
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/authenticate", {
        credentials: "include", // Include cookies (including HTTP-only cookies) in the request
      });

      if (res.status === 201) {
        const data = await res.json();
        console.log(data);
        dispatch(userLoggedIn());
        dispatch(userDetails(data));

        if (data.email == "testuser@gmail.com") {
          setIsAdmin(true);
        }
      } else {
        console.log(res);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(loginState);
  console.log(userState);

  return (
    <div className="flex w-full h-full">
      <nav className="w-full h-full bg-slate-800 justify-center">
        <div className="w-full my-2 h-4/5 flex flex-row justify-evenly items-center ">
          <div className="flex flex-row w-1/3 justify-center h-full items-center">
            <div className="text-2xl text-white font-sans">
              <Link to="/">Home</Link>
            </div>
          </div>
          <div className="flex flex-row w-2/3">
            <select
              className="block appearance-none bg-yellow-400 border rounded-tl-lg rounded-bl-lg font-sans w-[3rem] px-2 leading-tight focus:outline-none focus:border-blue-500"
              value={searchedItem}
              onChange={searchChangeHandler}
            >
              <option value="All" className="bg-white">
                All
              </option>
              <option value="Sports&Outdoors" className="bg-white">
                Sports & Outdoors
              </option>
              <option value="Cell Phones & Accessories" className="bg-white">
                Cell Phones & Accessories
              </option>
              <option value="Sports&Outdoors" className="bg-white">
                Sports & Outdoors
              </option>
              <option value="Electronics" className="bg-white">
                Electronics
              </option>
              <option value="Clothing" className="bg-white">
                Clothing
              </option>
            </select>
            <input
              type="text"
              className="w-3/4 rounded-tr-lg rounded-br-lg bg-white px-2"
              placeholder="search items here"
              value={searchedItem}
              onChange={searchChangeHandler}
            />
            <img
              src={SearchIcon}
              className=" w-12 h-12 mx-1 cursor-pointer"
              onClick={searchButton}
            />
          </div>
          <div className="flex flex-row w-1/3 justify-evenly h-full items-center">
            <div
              className="flex flex-row w-1/4 justify-center"
              onMouseEnter={() => dispatch(toolTipAlter(true))}
              onClick={() => dispatch(toolTipAlter(false))}
            >
              {loginState ? (
                <div className="flex flex-col w-full text-xl text-white font-sans text-ellipsis overflow-hidden">
                  <p className="text-base font-sans italic text-ellipsis overflow-hidden">
                    Hello,
                  </p>
                  <p className="text-xs font-sans font-semibold text-ellipsis overflow-hidden">
                    {userState.name}
                  </p>
                  {visible && <UserToolTip />}
                </div>
              ) : (
                <div className="text-1xl text-white font-sans">
                  <Link to="/signup">Sign In</Link>
                </div>
              )}
            </div>
            {isAdmin && (
              <div className="text-1xl text-white font-sans">
                <Link to="/admin">Admin</Link>
              </div>
            )}
            <div className="text-1xl text-white font-sans">
              <Link to={loginState ? `/orders/${userState._id}` : "/signup"}>
                Your Orders
              </Link>
            </div>
            <Link to={loginState ? `/carts/${userState._id}` : "/signup"}>
              <img
                src={ShoppingCart}
                alt="Cart"
                className="w-10 h-10 border-2xl rounded-lg "
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
