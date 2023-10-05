import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const AuthRegister = () => {
  const authUser = useSelector((state) => state.authUser);
  console.log(authUser);

  const [userObject, setUserObject] = useState({
    phone: "",
    password: "",
    cpassword: "",
  });

  console.log(userObject);

  const changeHandler = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    setUserObject({ ...userObject, [id]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(userObject);

    if (userObject.password != userObject.cpassword)
      alert(`Password are not matching`);
    else if (parseInt(userObject.password.length) < 6)
      alert(`Password length must be greater than 6`);

    const obj = {
      name: authUser.name,
      email: authUser.email,
      phone: userObject.phone,
      password: userObject.password,
    };
    console.log(obj);

    try {
      const res = await axios.post("http://127.0.0.1:8000/register", obj, {
        withCredentials: true,
      });

      if (res.status === 201) {
        alert(res.data);
        window.open("/signup", "_self");
      }
    } catch (err) {
      alert("Cannot register user");
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-row items-center justify-center">
        <div className="w-1/3 h-full my-10 p-4 flex flex-col border border-solid border-gray-200 rounded-xl shadow-md">
          <form className="flex flex-col my-2" onSubmit={submitHandler}>
            <p className="text-3xl font-sans font-semibold shadow-sm p-2">
              Hello, {authUser.name}
            </p>
            <div className="mt-5">
              <label
                htmlFor="phone"
                className="text-1xl font-sans font-semibold"
              >
                Enter Phone Number
              </label>
              <input
                id="phone"
                autoComplete="false"
                className="w-full h-full my-1 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
                onChange={changeHandler}
                value={userObject.phone}
                required
              />
            </div>
            <div className="my-5">
              <label
                htmlFor="password"
                className="text-1xl font-sans font-semibold"
              >
                Create a password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="false"
                value={userObject.password}
                className="w-full h-full my-1 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
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
                value={userObject.cpassword}
                className="w-full h-full my-1 px-4 py-2 text-gray-700 rounded-lg border border-solid border-cyan-600 shadow-sm"
                onChange={changeHandler}
                placeholder="At least 6 characters"
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
        </div>
      </div>
    </>
  );
};

export default AuthRegister;
