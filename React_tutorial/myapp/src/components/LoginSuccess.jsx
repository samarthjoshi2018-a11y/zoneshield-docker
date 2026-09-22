import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/slices/authSlice";
import { useNavigate } from "react-router-dom";


export default function LoginSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  console.log("LoginSuccess component mounted");
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log("Fetching user data after successful login");
        await dispatch(fetchUser()).unwrap();
        // redirect after successful auth
        console.log("User authenticated, navigating to home");
        navigate("/");
      } catch (err) {
        alert("Authentication failed. Please log in again.");
        console.error("Auth failed", err);
        navigate("/");
      }
    };

    initAuth();
  }, [dispatch, navigate]);

  return <div>Logging you in...</div>;
}