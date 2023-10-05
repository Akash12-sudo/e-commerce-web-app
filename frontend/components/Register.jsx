import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import googleIcon from "../images/google.png";

const REACT_APP_API_URL = "http://127.0.0.1:8000";

const Register = () => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    setUserdata({ ...userdata, [id]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (userdata.password != userdata.cpassword)
      alert(`Password are not matching`);
    else if (parseInt(userdata.password.length) < 6)
      alert(`Password length must be greater than 6`);
    else console.log(userdata);

    const { name, email, phone, password } = userdata;

    const submitData = async () => {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password,
        }),
      });

      console.log(response);
      if (response.status === 201) {
        alert("Account created successfully");
        window.open("/signup", "_self");
      }
    };

    submitData();
  };

  const googleAuthHandler = () => {
    window.open(`${REACT_APP_API_URL}/auth/google/callback`, "_self");
    dispatch({ type: "authLogin" });
  };

  return (
    <>
      <div className="w-full h-full flex flex-row items-center justify-center">
        <div className="w-1/3 h-full my-10 p-4 flex flex-col border border-solid border-gray-200 rounded-xl shadow-md">
          <p className="text-[2rem] font-semibold font-sans">Create Account</p>
          <form className="flex flex-col my-2" onSubmit={submitHandler}>
            <div className="my-2">
              <label
                htmlFor="name"
                className="text-1xl font-sans font-semibold"
              >
                Your name
              </label>
              <input
                id="name"
                value={userdata.name}
                className="w-full h-full my-2 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
                placeholder="First and last name"
                onChange={changeHandler}
                required
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="email"
                className="text-1xl font-sans font-semibold"
              >
                Email ID
              </label>
              <input
                id="email"
                type="email"
                value={userdata.email}
                className="w-full h-full my-2 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
                placeholder="Enter your email"
                onChange={changeHandler}
                required
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="phone"
                className="text-1xl font-sans font-semibold"
              >
                Mobile number
              </label>
              <input
                id="phone"
                value={userdata.phone}
                className="w-full h-full my-2 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
                placeholder="Enter phone number"
                onChange={changeHandler}
                required
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="password"
                className="text-1xl font-sans font-semibold"
              >
                Enter password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="false"
                value={userdata.password}
                className="w-full h-full my-2 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
                placeholder="At least 6 characters"
                onChange={changeHandler}
                required
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="cpassword"
                className="text-1xl font-sans font-semibold"
              >
                Re-enter password
              </label>
              <input
                id="cpassword"
                type="password"
                autoComplete="false"
                value={userdata.cpassword}
                className="w-full h-full my-2 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
                onChange={changeHandler}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-300 w-full h-full p-3 rounded-xl text-black font-sans mt-5"
            >
              Register
            </button>
          </form>
          <div className="my-2 flex md:flex-col lg:flex-row w-full items-center justify-center sm-flex-col">
            <p className="text-slate-600 hover:text-blue-600 w-full text-1xl text-center font-sans ml-auto mr-auto">
              Already have an account?
            </p>
            <Link to="/signup" className="w-full ">
              <p className="w-full h-full shadow-sm text-blue-600 mx-4 rounded-xl p-1 text-1xl lg:text-left md:text-center">
                Sign In
              </p>
            </Link>
          </div>
          <hr />
          <div className="w-full my-5 flex flex-col items-center">
            <p>or</p>
            <button
              className="my-3 w-5/6 bg-red-600/75 flex flex-row justify-evenly items-center font-semibold text-white text-[1.1rem] font-sans text-center  py-3 rounded-md"
              onClick={googleAuthHandler}
            >
              Continue with Google
              <img src={googleIcon} alt="" className="object-cover  h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
