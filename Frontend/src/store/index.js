import {configureStore } from "@reduxjs/toolkit";
import autheReducer from "./slices/authSlice";
import carReducer from "./slices/carSlice";
import bookingReducer from "./slices/bookingSlice"

const store = configureStore({
    reducer: {
        auth: autheReducer,
        cars: carReducer,
        booking: bookingReducer,
    },
});
export default store;
