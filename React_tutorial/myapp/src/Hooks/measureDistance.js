import { useEffect } from "react";
import { breached } from "./breached";
import { useSelector,useDispatch } from "react-redux";
import { setLocation, setRadius, setLocked, setCenter, setBreached } from "../features/slices/authSlice";

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
export const  measureDistance=() =>{
  console.log("Initializing distance measurement hook");
    const dispatch=useDispatch();
    const { lat, lng,radius,locked,center,breached } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!locked) return;

        const dist=getDistance(center.lat, center.lng, lat, lng);
        if(dist>radius){
            console.log("Breach detected! Distance:", dist, "Radius:", radius);
            dispatch(setBreached(true));
        }
    }, [lat, lng, radius, center, locked, dispatch]);
}