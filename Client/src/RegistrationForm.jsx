import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/RegistrationFormCSS.css";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://ecommerce-orpin-delta.vercel.app/user/register", {
        email,
        password,
      });

      if (response.data) {
        console.log("Registration is successful!", response.data);
        navigate("/user/login");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed. Please try again.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="registration-container">
        <h2 className="registration-header">Registration</h2>
        <form className="registration-form" onSubmit={handleRegistration}>
          <label className="registration-label" htmlFor="email">
            Email:
          </label>
          <input
            className="registration-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="registration-label" htmlFor="password">
            Password:
          </label>
          <input
            className="registration-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="registration-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
