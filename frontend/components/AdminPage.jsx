import React, { useState } from "react";
import { products } from "../database/Data";

const AdminPage = () => {
  //   const OneTimeHandler = async () => {
  //     const res = await fetch("http://127.0.0.1:8000/oneTimeHandler", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify(products),
  //     });

  //     console.log(res.status);
  //   };

  return (
    <div className="w-full h-full p-2 flex flex-col">
      <p>Admin Page</p>
    </div>
  );
};

export default AdminPage;
