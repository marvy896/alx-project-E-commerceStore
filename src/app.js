import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/home";
import Cart from "./screens/cart/cart";
import Login from "./screens/login/login";
import Store from "./screens/home";

function App() {
  const [token, setToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({ username: "" });

  useEffect(() => {
    // Check if a user token is stored in sessionStorage
    const userToken = sessionStorage.getItem("token");
    if (userToken) {
      setToken(JSON.parse(userToken));
    }

    // Check if a logged-in user is stored in sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSetToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const handleSetLoggedInUser = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setLoggedInUser(user);
  };

  if (!token) {
    return (
      <Login
        setToken={handleSetToken}
        setLoggedInUser={handleSetLoggedInUser}
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home user={loggedInUser} />} />
      <Route path="/cart" element={<Cart user={loggedInUser} />} />
      <Route path="/store" element={<Store user={loggedInUser} />} />
    </Routes>
  );
}

export default App;
