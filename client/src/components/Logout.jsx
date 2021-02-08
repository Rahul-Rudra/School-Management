import React from "react";
import { Redirect } from "react-router-dom";
const Logout = () => {
  const role=localStorage.getItem("role");
  console.log(role==="Admin")
  localStorage.clear();
  
  return <Redirect to={ "/"}></Redirect>;
};

export default Logout;