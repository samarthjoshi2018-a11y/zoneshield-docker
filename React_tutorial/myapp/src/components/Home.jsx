import "./css/home.css";
import { useSelector } from "react-redux";
import ShowServices from "./ShowServices";
import Login from "./Login";
import { Link } from "react-router-dom";
export default function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="homecontainer">
      
      <div className="homecontent">
        <h2 className="heading1">
          Geolocation security made simple. <br />
          Protect your loved ones with Zoneshield.
        </h2>
        <br />
        <br />
        <ul className="features">
          <li>
            Set up virtual geofences around important locations like home,
            school, or work.
          </li>
          <li>
            Receive real-time alerts when someone enters or leaves a geofenced
            area.
          </li>
          <li>
            Customize geofence settings and notification preferences for each
            location.
          </li>
          <li>
            Keep your family safe and informed with Zoneshield's easy-to-use
            geolocation security.
          </li>
          <li>
            Sign up today and start protecting your loved ones with Zoneshield!
          </li>
        </ul>
        <br />
        <br />

        {isAuthenticated ? (
          <Link to="/showServices" className="nav-link">
            <button className="btn btn-primary" onClick={ShowServices}>
              View Services
            </button>
          </Link>
        ) : (
          <Link to="/showLogin" className="nav-link">
            <button className="btn btn-primary" onClick={Login}>
              Login / Register
            </button>
          </Link>
        )}
      </div>
      <div className="imgview">
        <img src="../image2.png" alt="" />
      </div>
    </div>
  );
}
