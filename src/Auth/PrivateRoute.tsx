import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");

  if (!token) {
    navigate("/login"); // Redirect to the login route if not authenticated
    return null; // Return null to prevent rendering unauthorized content
  }

  return <Outlet />; // Render nested routes if authenticated
};

export default PrivateRoute;