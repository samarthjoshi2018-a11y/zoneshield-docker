import api from "../api/api";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setemail, setisAuthenticated } from "../features/slices/authSlice";
import { useDispatch } from "react-redux";
import "./css/home.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting login form");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      dispatch(setisAuthenticated());
      navigate("/login/success");
      alert("Login successful!");
    } catch (err) {
      console.error("Error =", err);
      navigate("/");
    }
  };

  return (
    <div className="loginform">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <div>
          <Link to="/register" className="nav-link">
            <p>Don't have an account?</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
