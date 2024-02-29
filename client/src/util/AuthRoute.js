//redirects these pages to homepage if **NOT** logged in
import React, { useContext } from "react";
import {Router,  Route, Navigate, Routes } from "react-router-dom";

import { AuthContext } from "../context/auth";

function AuthRoute({ children, redirectTo }) {
  const { user } = useContext(AuthContext);
  console.log(children);
  return user ? children : <Navigate to={redirectTo} />;

}
export default AuthRoute;
