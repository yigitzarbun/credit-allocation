import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
function PrivateRoutes() {
  const token = useSelector((store) => store.user);
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
