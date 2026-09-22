import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api';
const initialState = { value: 0 }


export const saveGeoData = createAsyncThunk(
    "userinfo/startservice",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post("/userinfo/startservice", payload);
            console.log("Geo data saved successfully:", res.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Error saving data");
        }
    }
);



export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/userinfo/fetchuser")
            console.log("Fetched user data:", res.data);
            return res.data;
        }
        catch (err) {
            console.error("Error fetching user data:", err);
            return rejectWithValue(null)
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            await api.get("/auth/logout")
            window.location.href = "/";
        } catch (err) {
            console.error("Error during logout:", err);
        }

    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: null,
        isAuthenticated: false,
        loading: true,
        lat: null,
        lng: null,
        radius: 50,
        center: null,
        breached: false,
        temperature: null,
        startDate: null,
        endDate: null,
        locked: false,
        firstemail: null,
        secondemail: null,
        thirdemail: null,
        service: null,
        seconds: 0,
        isRunning: false

    },
    reducers: {
        setemail: (state, action) => {
            state.email = action.payload;
        },
        setLocation: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        },
        setFirstEmail: (state, action) => {
            state.firstemail = action.payload;
        },
        setSecondEmail: (state, action) => {
            state.secondemail = action.payload;
        },
        setThirdEmail: (state, action) => {
            state.thirdemail = action.payload;
        },
        setService: (state, action) => {
            state.service = action.payload;
        },
        setTemperature: (state, action) => {
            state.temperature = action.payload;
        },
        setStartDate: (state, action) => {
            state.startdate = action.payload;
        },
        setLocked: (state, action) => {
            console.log("Setting locked in slice:", action.payload);
            state.locked = action.payload;
        },
        setRadius: (state, action) => {
            console.log("Setting radius in slice:", action.payload);
            state.radius = action.payload;
        },
        setCenter: (state, action) => {
            console.log("Setting center in slice:", action.payload);
            state.center = action.payload;
        },
        setBreached: (state, action) => {
            state.breached = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        setisAuthenticated: (state, action) => {
            state.isAuthenticated = true;
        },
        startTimer: (state, action) => {
            state.isRunning = true;
        },
        stopTimer: (state) => {
            state.isRunning = false;
            state.locked = false;
        },
        setSeconds: (state, action) => {
            state.seconds = action.payload;
        },
        resetTimer: (state) => {
            state.seconds = 0;
            state.isRunning = false;
        },
        tick: (state) => {
            if (state.isRunning && state.seconds > 0) {
                state.seconds -= 1;
            }
            if (state.seconds === 0) {
                state.isRunning = false;
                state.locked = false;
                state.breached = false;
                state.center = null;
                state.radius = 50;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                const data = action.payload;
                state.email = data.email ?? null;
                state.service = data.type ?? null;
                state.isAuthenticated = true;
                state.loading = false;
                console.log("User data set in state:", {
                    email: state.email,
                    service: state.service,
                    isAuthenticated: state.isAuthenticated,
                });
            })
            .addCase(fetchUser.rejected, (state) => {
                state.email = null;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.email = null
                state.isAuthenticated = false
            })
    }
});

export default authSlice.reducer
export const { setLocation, setTemperature, setemail, setStartDate, setEndDate, setisAuthenticated, setLocked, setRadius, startTimer, stopTimer, tick, resetTimer, setCenter, setBreached, setSeconds, setService, setFirstEmail, setSecondEmail, setThirdEmail } = authSlice.actions;
