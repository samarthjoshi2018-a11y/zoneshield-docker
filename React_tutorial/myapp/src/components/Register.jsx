import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api/api";
import { setemail } from "../features/slices/authSlice";
import "./css/home.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/register/user", { email, password });
      dispatch(setemail(res.data.email));
      navigate("/");
    } catch (err) {
      alert("User already exists");
      navigate("/");
    }
  };

  return (
    <div className="registercontainer">
      <div className="overlay" />

      <form className="login-form glass-card auth-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create Account</h1>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control custom-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control custom-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100 submit-btn">
          Register
        </button>

        <p className="form-footer">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/showLogin")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}