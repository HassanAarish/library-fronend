import React from "react";
import Home from "../views/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "../views/home/Profile";
import Cart from "../views/home/Cart";
import Books from "../views/home/Book";
import About from "../components/About";

const HomeLayout = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Navigate to={"/home"} replace />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/book" element={<Books />} />
    </Routes>
  );
};

export default HomeLayout;
