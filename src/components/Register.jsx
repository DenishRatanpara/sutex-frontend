import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State to store error messages
  const { username, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ username, email, password });

      const res = await axios.post(
        "https://sutex-backend.onrender.com/api/auth/register/",
        body,
        config
      );

      console.log("API Response:", res);

      if (res && res.data) {
        console.log("Response Data:", res.data);
        // Redirect to login page after successful registration
        navigate("/login");
      }
    } catch (err) {
      console.error("API Error:", err);

      if (err.response && err.response.data) {
        if (err.response.data.username) {
          setError("A user with that username already exists.");
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={onChange}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <div className="login-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Register;
