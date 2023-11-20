import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://ecommerce-orpin-delta.vercel.app/user/login", {
        email,
        password,
      });

      if (response.data) {
        console.log("Login successful!", response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please check your credentials.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="login-container">
        <h2 className="login-header">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-label" htmlFor="email">
            Email:
          </label>
          <input
            className="login-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label" htmlFor="password">
            Password:
          </label>
          <input
            className="login-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
