import {configureStore } from "@reduxjs/toolkit";
import carReducer from "./slices/carSlice";
import bookingReducer from "./slices/bookingSlice";
import accountReducer from "./slices/accountSlice";
import customerReducer from "./slices/customerAuthSlice";

const store = configureStore({
    reducer: {
        customer: customerReducer,
        account: accountReducer,
        cars: carReducer,
        booking: bookingReducer,

    },
});
export default store;
