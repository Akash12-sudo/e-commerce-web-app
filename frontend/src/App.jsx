import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../components/Signup";
import Register from "../components/Register";
import Home from "../components/Home";
import NavigationBar from "../components/NavigationBar";
import Orders from "../components/Orders";
import Carts from "../components/Carts";
import ProductPage from "../components/ProductPage";
import Error from "../components/Error";
import BuyPage from "../components/BuyPage";
import UserProfile from "../components/UserProfile";
import AdminPage from "../components/AdminPage";
import AuthRegister from "../components/AuthRegister";
import { toolTipAlter } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const App = () => {
  const loginState = useSelector((state) => state.authenticateLogin);
  const dispatch = useDispatch();
  console.log({ state: loginState });

  const [googleUser, setGoogleUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `http://127.0.0.1:8000/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      if (data.message === "Successfully logged In") {
        console.log(data.user);
        dispatch({ type: "authData", payload: data.user._json });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getlist = async () => {
    const res = await fetch("http://127.0.0.1:8000/fetchProductList");
    const data = await res.json();
    dispatch({ type: "list", payload: data });
  };

  useEffect(() => {
    getUser();
    getlist();
  }, []);

  console.log(googleUser);

  return (
    <div onClick={() => dispatch(toolTipAlter(false))}>
      <Router>
        <NavigationBar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/signup" element={loginState ? <Error /> : <Signup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders/:id" element={<Orders />} />
          <Route path="/carts/:id" element={<Carts />} />
          <Route path="/purchase/:id" element={<BuyPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/authsignup" element={<AuthRegister />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
