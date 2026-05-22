import {configureStore } from "@reduxjs/toolkit";
import autheReducer from "./slices/authSlice";
import carReducer from "./slices/carSlice";
const store = configureStore({
    reducer: {
        auth: autheReducer,
        cars: carReducer,
    },
});
export default store;