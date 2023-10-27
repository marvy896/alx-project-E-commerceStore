import React, { useState } from "react";
import PropTypes from "prop-types";
import smile from "../../imagepage/smile1.jpg";
import "./Login.css";

async function loginUser(credentials) {
  return fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="landing-Page">
      <div className="header-box">
        <h1> Welcome to Thavmasios Hair Store</h1>
      </div>
      <div className="landing-inner">
        <div>
          <img src={smile} className="smile" />
        </div>
        <div >
          <div className="inner-div">
            We deliver the best abd ufifjn cpfufjm bjiid susdif sdodhohosohosd
            nosoosodhdshdidbdhs <br /> y8tt8stta97tsv gaugfiydfyifaiv hhbaodo
            oihaipap
            <div>
              <div className="login-wrapper">
                <h1 className="login">Please Log In</h1>
                {showLoginForm ? (
                  <form onSubmit={handleSubmit}>
                    <label>
                      <p>Username</p>
                      <input
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </label>
                    <label>
                      <p>Password</p>
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </label>
                    <div>
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                ) : (
                  // Render a "Login" button when showLoginForm is false
                  <button onClick={() => setShowLoginForm(true)}>Login</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
