import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Register, Login } from "@/pages/index";

const AuthLayout = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Navigate to={"/login"} replace />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Register />} />
      {/* <Route exact path="/verify-code" element={<VerifyOtp />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/reset-password/:token" element={<ResetPassword />} /> */}
    </Routes>
  );
};

export default AuthLayout;
