import React from "react";
import Home from "../views/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "../views/home/Profile";

const HomeLayout = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Navigate to={"/home"} replace />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default HomeLayout;
