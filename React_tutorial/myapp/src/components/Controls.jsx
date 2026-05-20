import { useDispatch, useSelector } from "react-redux";
import {
  setLocked,
  startTimer,
  setBreached,
  setCenter,
  setEndDate,
  setFirstEmail,
  setSecondEmail,
  setThirdEmail,
  setRadius,
  setSeconds,
  stopTimer,
} from "../features/slices/authSlice";
import { useState } from "react";
import "./css/home.css";
import { saveGeoData } from "../features/slices/authSlice";

export default function Controls() {
 
  const dispatch = useDispatch();
  const {
    email,
    radius,
    locked,
    center,
    lat,
    lng,
    isRunning,
    seconds,
    firstemail,
    secondemail,
    thirdemail,
  } = useSelector((state) => state.auth);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const handleSet = () => {
    const payload = {
      email,
      lat,
      lng,
      center,
      seconds,
      radius,
      firstEmail: firstemail,
      secondEmail: secondemail,
      thirdEmail: thirdemail,
    };

    dispatch(saveGeoData(payload));
    dispatch(startTimer());
    dispatch(setLocked(true));
  };
  const handleunlock = () => {
    dispatch(setLocked(false));
    dispatch(setBreached(false));
    dispatch(setSeconds(0));
    dispatch(setEndDate(null));
    dispatch(setRadius(50));
    dispatch(stopTimer());
  };

  return (
    <div style={{ padding: 10 }} className="controls">
      {!locked ? (
        <>
        <br />
          <h3 className="special-font">Drag, resize and set the shield. </h3>
          <br />
          <br />
          <div className="dropdown">
            <h6>Set Timer</h6>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {seconds > 0
                ? `${seconds / 3600} Hour${seconds / 3600 > 1 ? "s" : ""}`
                : "Select timer"}
            </button>

            {!isRunning && (
              <ul className="dropdown-menu">
                {[...Array(24)].map((_, i) => (
                  <li key={i}>
                    <button
                      className="dropdown-item"
                      onClick={() => dispatch(setSeconds((i + 1) * 3600))}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
            <br />
          <p>Radius: {radius} m</p>
          <br /><br /><br />
          <p> <b>Enter three emails of your trusted contacts.</b></p>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={firstemail}
              onChange={(e) => dispatch(setFirstEmail(e.target.value))}
            />
            
            <label htmlFor="floatingInput">Email address 1</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={secondemail}
              onChange={(e) => dispatch(setSecondEmail(e.target.value))}
            />

            <label htmlFor="floatingInput">Email address 2</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={thirdemail}
              onChange={(e) => dispatch(setThirdEmail(e.target.value))}
            />

            <label htmlFor="floatingInput">Email address 3</label>
          </div>
          <button className="btn btn-primary action-btn" onClick={handleSet}>
            Lock
          </button>
        </>
      ) : (
        <>
          <div className="service-details">
            <h2 className="special-font">SERVICE STARTED</h2>
            <br /><br />
            <h6>
              Your trusted emails will get the notification whenever the boundry
              is breached. <br />
              <br />
              Do not close or reload the application.
            </h6>
            <br /><br /><br />
            <h6>
              Time remaining:{" "}
              {seconds === 0
                ? "0 Seconds"
                : `${hours > 0 ? `${hours} Hour${hours > 1 ? "s" : ""} ` : ""}` +
                  `${
                    minutes > 0
                      ? `${minutes} Minute${minutes > 1 ? "s" : ""} `
                      : ""
                  }` +
                  `${
                    secs > 0
                      ? `${secs} Second${secs > 1 ? "s" : ""}`
                      : ""
                  }`}
            </h6>
            Your trusted emails: <br />
            <ul>
              <li>{firstemail}</li>
              <li>{secondemail}</li>
              <li>{thirdemail}</li>
            </ul>
            <p>
              Note that the emails will receive notifications when the boundary
              is breached.
            </p>
            <button className="btn btn-primary action-btn" onClick={handleunlock}>
              Unlock
            </button>
          </div>
        </>
      )}
    </div>
  );
}
