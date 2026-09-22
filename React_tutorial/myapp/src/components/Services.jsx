// Services.jsx
import "./css/home.css";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import api from "../api/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setService } from "../features/slices/authSlice";

export default function Services() {
  const { isAuthenticated,email } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectService = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please log in to select a service.");
      navigate("/showlogin");
    }
    try {
      const res = await api.post("/userinfo/setservice", {
        email,
        type: "Basic",
      });
      alert("Service selected successfully!");
      dispatch(setService("Basic"));
      navigate("/");
    } catch (err) {
      console.error("Error selecting service:", err);
      alert("Failed to select service. Please try again.");
      navigate("/")
    }
  };

  return (
    <div className="servicecontainer">
      <h1>Available Services</h1>
      <div className="container text-center servicesinfo">
        <div className="row">
          <div className="col border border-info service">
            <br />
            <h3>Basic Service</h3>
            <br />
            <h4>Features</h4>
            <ol className="list-group list-group-numbered">
              <li className="list-group-item   list-group-item-info">
                Zone works till 24 hours. You can also set the time manually.
              </li>
              <li className="list-group-item   list-group-item-info">
                Email notifications for breaches.
              </li>
              <li className="list-group-item list-group-item-info">
                Unlock cooldown of 5 minutes.
              </li>
                <li className="list-group-item list-group-item-info">
                  Unlock anytime.
              </li>
            
              <br />
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={selectService}
                >
                  Select
                </button>
              </div>
            </ol>
          </div>
          <div className="col border border-info service">
            <br />
            <h3>Premium Service</h3>
            <br />
            <h4>Features</h4>

            <ol className="list-group list-group-numbered">
              <li className="list-group-item   list-group-item-info">
                Same as basic service with additional features
              </li>
            
              <li className="list-group-item   list-group-item-info">
                Notifications are based on weather conditions and Temperature
              </li>
              <li className="list-group-item list-group-item-info">
                Day of the week and time of the day
              </li>
              <li className="list-group-item list-group-item-info">
                Analyse user patterns and send notifications accordingly
              </li>
              <br />
              <div className="d-grid gap-2 col-6 mx-auto"></div>
            </ol>
            <h3>(Comming Soon)</h3>
          </div>
        
        </div>
      </div>
    </div>
  );
}
