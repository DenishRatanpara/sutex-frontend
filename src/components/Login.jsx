import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // State to store error messages
  const { username, password } = formData;
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

      const body = JSON.stringify({ username, password });
      const res = await axios.post(
        "https://sutex-backend.onrender.com/api/auth/login/",
        body,
        config
      );

      console.log("API Response:", res);

      if (res && res.data) {
        console.log("Response Data:", res.data);
        // Save the token to localStorage
        localStorage.setItem("token", res.data.token);
        // Redirect to home page after successful login
        navigate("/home");
      }
    } catch (err) {
      console.error("API Error:", err);

      if (err.response && err.response.data) {
        if (err.response.data.non_field_errors) {
          setError("Invalid username or password.");
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
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
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="signup-link">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
