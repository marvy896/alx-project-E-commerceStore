import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/home";
import Cart from "./screens/cart/cart";
import Login from "./screens/login/login";
import Store from "./screens/store/store"; // Update the import path
import RegisterUsers from "./screens/users/registerUsers";
import UsersLogin from "./screens/users/usersLogin";
import { useNavigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

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

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/home" />
          ) : (
            <Login
              setToken={handleSetToken}
              setLoggedInUser={handleSetLoggedInUser}
            />
          )
        }
      />
      <Route
        path="/home"
        element={
          token ? (
            <Home user={loggedInUser} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/cart" element={<Cart user={loggedInUser} />} />
      <Route path="/store" element={<Store user={loggedInUser} />} />
      <Route
        path="/usersLogin"
        element={
          <UsersLogin
            setToken={handleSetToken}
            setLoggedInUser={handleSetLoggedInUser}
          />
        }
      />
      <Route path="/registerUsers" element={<RegisterUsers />} />
    </Routes>
  );
}

export default App;
