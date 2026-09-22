import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setLocation } from "../features/slices/authSlice";
import { useSelector } from "react-redux";

export const useGeolocation = () => {
  const { service, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("Initializing geolocation hook");
  useEffect(() => {
    if (service === null || !isAuthenticated) {
      console.log("Geolocation paused: user not authenticated or no service");
      return;
    }

    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        dispatch(
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        );
        console.log("Updated location:", {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error(err),
      {
        enableHighAccuracy: true,
        timeout: 30000
      }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [dispatch]);
};