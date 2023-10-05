import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    identity: "",
    password: "",
  });

  const [goToPassword, setGoToPassword] = useState(false);
  const [email, setEmail] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/; // Assumes a 10-digit phone number

  const changeHandler = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    setLoginDetails({ ...loginDetails, [id]: value });

    const identity = loginDetails.identity;
    console.log(loginDetails);

    if (emailPattern.test(identity)) {
      setEmail(true);
    }
    console.log(email);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const identity = loginDetails.identity;
    console.log(loginDetails);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/; // Assumes a 10-digit phone number

    if (!identity.length) {
      return alert("Please fill the input");
    }

    if (loginDetails.password.length < 6) {
      return alert("Password length must be at least 6");
    }

    if (!emailPattern.test(identity) && !phonePattern.test(identity))
      return alert("Invalid inputs");

    const responseHandler = async () => {
      const response = await fetch("http://127.0.0.1:8000/signin", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          email
            ? { email: loginDetails.identity, password: loginDetails.password }
            : { phone: loginDetails.identity, password: loginDetails.password }
        ),
      });
      console.log(response);
      if (response.status === 201) {
        alert("user successfully logged in");
        navigate("/");
        window.location.reload();
      }
    };

    responseHandler();
  };

  return (
    <>
      <div className="w-full h-full flex flex-row items-center justify-center">
        <div className="w-1/3 h-full my-10 p-4 flex flex-col border border-solid border-gray-200 rounded-xl shadow-md">
          <form className="flex flex-col my-2" onSubmit={submitHandler}>
            <p className="text-[2rem] my-1 font-semibold font-sans">Sign In</p>
            <label
              htmlFor="identity"
              className="text-1xl font-sans font-semibold"
            >
              Email or phone number
            </label>
            <input
              id="identity"
              autoComplete="false"
              value={loginDetails.identity}
              onChange={changeHandler}
              className="w-full h-full my-2 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
              required
            />
            <label
              htmlFor="password"
              className="text-1xl mt-5 font-sans font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="false"
              value={loginDetails.password}
              onChange={changeHandler}
              className="w-full h-full my-2 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-yellow-300 w-full h-full p-3 rounded-xl text-black font-sans mt-5"
            >
              SignIn
            </button>
          </form>

          <div className="mt-10 flex flex-col w-full">
            <p className="text-slate-600 hover:text-blue-600 text-1xl font-sans ml-auto mr-auto">
              Don't have an account?
            </p>
            <hr />
            <Link to="/register">
              <p className="mt-5 mx-auto w-2/3 h-full border border-solid border-slate-600 shadow-sm text-black rounded-xl p-3 text-center">
                Create Account
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
