import React, { useState } from "react";
import Home from "./screens/home";
import Cart from "./screens/cart/cart";
//@ts-expect-error
import Login from "./screens/login/login";
import { Routes, Route } from 'react-router-dom';


function setToken(userToken: string) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  //@ts-expect-error
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

export default function App() {
  const token = getToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
