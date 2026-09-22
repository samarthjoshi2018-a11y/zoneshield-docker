import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../features/slices/authSlice";
import "./css/home.css";
import { useDispatch } from "react-redux";
  
export default function Navbar() {
  const { isAuthenticated, loading, service } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  if (loading) return null;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <img src="../public/image2.png" alt="" style={{ width: "60px", height: "60px", margin: "10px 20px" }} />
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <h1 className="special-font">Zoneshield</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <Link to="/" className="nav-link " aria-current="page">
                  Home
                </Link>
              </li>
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/showservices" className="nav-link">
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/showLogin" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {service !== null ? (
                    <li className="nav-item">
                      <Link to="/mapcomponent" className="nav-link">
                        My service
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link to="/showservices" className="nav-link">
                        Services
                      </Link>
                    </li>
                  )}

                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => dispatch(logoutUser())}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link to="/help" className="nav-link">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
