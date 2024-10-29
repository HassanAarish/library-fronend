import React from "react";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "../views/auth/ForgotPassword";
import VerifyOtp from "../views/auth/verifyOTP";

const AuthLayout = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Navigate to={"/login"} replace />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Register />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/verify-code" element={<VerifyOtp />} />
    </Routes>
  );
};

export default AuthLayout;
