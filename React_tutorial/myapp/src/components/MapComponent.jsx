import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { APIProvider, Map, Marker, Circle } from "@vis.gl/react-google-maps";
import { useRef, useEffect } from "react";
import {
  setLocation,
  setRadius,
  setLocked,
  setCenter,
} from "../features/slices/authSlice";
import Controls from "./Controls";
import { useGeolocation } from "../Hooks/useGeolocation";
import { measureDistance } from "../Hooks/measureDistance";
import{ breached } from "../Hooks/breached";
import "./css/home.css";
import { useTimer } from "../Hooks/useTimer";

export default function MapComponent() {
  useGeolocation();
  useTimer();
  measureDistance();
  breached();


  console.log("Rendering Mapview");

  const dispatch = useDispatch();
  const circleRef = useRef(null);

  const { lat, lng, center, radius, locked } = useSelector(
    (state) => state.auth,
  );
  const onLoad = (circle) => {
    console.log("Circle loaded:", circle);
    circleRef.current = circle;
  };

  const handleRadiusChange = () => {
    console.log("Radius changed by user, updating state...");

    if (!circleRef.current) return;
    console.log("Radius changed by user, updating state...");
    const newRadius = circleRef.current.getRadius();
    dispatch(setRadius(Math.round(newRadius)));
  };

  const handleCenterChange = () => {
    if (!circleRef.current) return;
    console.log("Circle center changed, updating state...");
    
    const c = circleRef.current.getCenter();
    dispatch(setCenter({ lat: c.lat(), lng: c.lng() }));
  };

  useEffect(() => {
    if (!circleRef.current) return;
    console.log("Updating circle radius to:", radius);
    if (Math.abs(circleRef.current.getRadius() - radius) > 0.1) {
      circleRef.current.setRadius(radius);
    }
  }, [radius]);

  useEffect(() => {
    if (!circleRef.current || !center) return;
    console.log("Updating circle center to:", center);
    const currentCenter = circleRef.current.getCenter();
    if (
      currentCenter.lat() !== center.lat ||
      currentCenter.lng() !== center.lng
    ) {
      circleRef.current.setCenter(center);
    }
  }, [center]);

  if (lat == null || lng == null) return <h2>Loading...</h2>;

  return (
    <div className="service-component">
      <div className="map-container">
        <APIProvider apiKey="AIzaSyCtOJ4xvIfNeb6xybg5NSVScdj1lGmzFRM">
          <Map
            zoom={15}
            center={center}
            style={{ width: "100%", height: "90vh" }}
          >
            {/* User marker */}
            {/* Editable / locked circle with key prop */}
            <Circle
              ref={circleRef}
              center={center || { lat, lng }}
              radius={radius}
              editable={!locked}
              draggable={!locked}
              onLoad={onLoad}
              onRadiusChanged={handleRadiusChange}
              onMouseUp={handleRadiusChange}
              onCenterChanged={handleCenterChange}
              fillColor="#0088ff"
              fillOpacity={0.3}
              strokeColor="#0088ff"
            />
            <Marker position={{ lat, lng }} />
          </Map>
        </APIProvider>
      </div>

      <Controls />
    </div>
  );
}
