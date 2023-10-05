import React, { useState } from "react";
import { useSelector } from "react-redux";
import profile from "../images/profile.png";

const UserProfile = () => {
  const loginState = useSelector((state) => state.authenticateLogin);
  const user = useSelector((state) => state.getUser);

  const [image, setImage] = useState({ preview: "", raw: "" });
  const [addressToggler, setAddressToggler] = useState(false);
  const [updateAddressToggler, setUpdateAddressToggler] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const handleProfilePictureChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUploadProfilePic = async (e) => {
    const file = image.raw.name;
    console.log(file);

    const res = await fetch("http://127.0.0.1:8000/addProfilePic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ profile_pic: file }),
    });

    if (res.status == 201) alert("Profile pic updated!!");
  };

  const submitAddressHandler = async (e) => {
    e.preventDefault();
    console.log(newAddress);

    const sendResponse = await fetch("http://127.0.0.1:8000/addAddress", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: newAddress }),
    });

    console.log(sendResponse);
    if (sendResponse.status == 201) {
      alert("Address updated!!");
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col w-5/6 h-full mx-auto">
      {user.profile_pic ? (
        <img
          src={user.profile_pic}
          alt="profile"
          className="h-48 w-48 my-2 object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col justify-left mt-10 p-2">
          <div className="flex flex-col h-full w-full">
            <img
              src={profile}
              alt="profile"
              className="h-48 w-48 my-2 object-cover"
            />
            {/* <input type="file" accept="image/*" onChange={handleProfilePictureChange} /> */}
          </div>
        </div>
      )}

      <div className="w-2/3 h-full flex flex-col mt-4 p-2">
        <hr />
        <div className="flex flex-row justify-between align-center  items-center py-4">
          <p className="font-semibold font-mono text-2xl text-shadow">Name</p>
          <input
            placeholder={user.name}
            disabled={true}
            className="border-2 border-solid border-blue-800 rounded-xl px-4 text-2xl font-mono text-center text-bold placeholder-slate-900 placeholder-opacity-75 shadow-lg"
          />
          <button className="px-4 py-1 h-full bg-red-600/75 text-2xl font-mono text-white rounded-lg shadow-lg">
            Update
          </button>
        </div>
        <div className="flex flex-row justify-between items-center py-2">
          <p className="font-semibold font-mono text-2xl">Email</p>
          <input
            placeholder={user.email}
            disabled="false"
            className="border-2 border-solid border-blue-800 rounded-xl px-4 text-2xl font-mono text-center text-bold placeholder-slate-900 placeholder-opacity-75 shadow-lg"
          />
          <button className="px-4 py-1 h-full bg-red-600/75 text-2xl font-mono text-white rounded-lg shadow-lg">
            Update
          </button>
        </div>
        <div className="flex flex-row justify-between items-center py-2">
          <p className="font-semibold font-mono text-2xl text-shadow">Mobile</p>
          <input
            placeholder={user.phone}
            disabled="false"
            className="border-2 border-solid border-blue-800 rounded-xl px-4 text-2xl font-mono text-center text-bold placeholder-slate-900 placeholder-opacity-75 shadow-lg"
          />
          <button className="px-4 py-1 h-full bg-red-600/75 text-2xl font-mono text-white rounded-lg shadow-lg">
            Update
          </button>
        </div>
        <hr />
      </div>
      <div className="w-2/3 bg-slate-200/25 mt-4 p-2 flex flex-col justify-evenly">
        <p className="font-semibold font-mono text-2xl text-red-800 text-shadow">
          Your Address
        </p>

        {user.address ? (
          <div>
            {!updateAddressToggler ? (
              <>
                <div className="flex flex-row justify-between">
                  <textarea
                    id="address"
                    value={user.address}
                    draggable="false"
                    rows="auto"
                    cols="45"
                    contentEditable="false"
                    className="p-2 border border-solid border-gray-500 rounded-xl font-mono text-[1.3rem] text-slate-800 font-semibold"
                  />
                  <button
                    className="mx-5 px-2 h-20 bg-yellow-600/75 text-2xl font-mono text-white rounded-lg shadow-lg"
                    onClick={() => setUpdateAddressToggler(true)}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="flex w-full justify-center">
                {addressToggler ? (
                  <>
                    <div className="w-full flex ">
                      <form
                        className="w-full h-full flex flex-col"
                        onSubmit={submitAddressHandler}
                      >
                        <textarea
                          id="address"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          rows="auto"
                          cols="30"
                          className="p-2 border-2 border-solid border-blue-800 rounded-xl font-mono text-1xl text-slate-800 font-semibold"
                        />
                        <div className="flex flex-row justify-center mt-5">
                          <button
                            type="submit"
                            className="bg-yellow-800/75 w-1/5 text-white text-1xl rounded-lg p-2"
                          >
                            Add
                          </button>
                          <button
                            className="mx-4 bg-red-800/75 w-1/5 text-white text-1xl rounded-lg p-2"
                            onClick={() => setAddressToggler(false)}
                          >
                            Go Back
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-row w-full">
                    <button
                      className="m-2 px-5 py-1 w-1/2 rounded-xl bg-yellow-500 text-slate-800 font-mono text-[1.1rem]"
                      onClick={() => setAddressToggler(true)}
                    >
                      Add new address
                    </button>
                    <button
                      className="m-2 px-5 py-1 w-1/2 rounded-xl bg-red-500/75 text-slate-800 font-mono text-[1.1rem]"
                      onClick={() => setUpdateAddressToggler(false)}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex w-full justify-center">
            {addressToggler ? (
              <>
                <div className="w-full flex ">
                  <form
                    className="w-full h-full flex flex-col"
                    onSubmit={submitAddressHandler}
                  >
                    <textarea
                      id="address"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      rows="auto"
                      cols="30"
                      className="p-2 border-2 border-solid border-blue-800 rounded-xl font-mono text-1xl text-slate-800 font-semibold"
                    />
                    <div className="flex flex-row justify-center mt-5">
                      <button
                        type="submit"
                        className="bg-yellow-800/75 w-1/5 text-white text-1xl rounded-lg p-2"
                      >
                        Add
                      </button>
                      <button
                        className="mx-4 bg-red-800/75 w-1/5 text-white text-1xl rounded-lg p-2"
                        onClick={() => setAddressToggler(false)}
                      >
                        Go Back
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <button
                className="px-5 py-1 w-1/2 rounded-xl bg-yellow-500 text-slate-800 font-mono text-[1.1rem]"
                onClick={() => setAddressToggler(true)}
              >
                Add new address
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
