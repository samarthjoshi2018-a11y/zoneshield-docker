import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tick } from "../features/slices/authSlice";

export const useTimer = () => {
    const dispatch = useDispatch();
    const { isRunning } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            dispatch(tick());
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, dispatch]);
};