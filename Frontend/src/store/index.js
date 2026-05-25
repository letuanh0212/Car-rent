import {configureStore } from "@reduxjs/toolkit";
import autheReducer from "./slices/authSlice";
import carReducer from "./slices/carSlice";
import bookingReducer from "./slices/bookingSlice";
import accountReducer from "./slices/accountSlice";
const store = configureStore({
    reducer: {
        auth: autheReducer,
        cars: carReducer,
        booking: bookingReducer,
        account: accountReducer,
    },
});
export default store;
