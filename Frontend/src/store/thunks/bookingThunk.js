import { createAsyncThunk } from "@reduxjs/toolkit";

import BookingCustomer from "~/apis/customer/bookingCustomer";

export const createBookingThunk = createAsyncThunk(
  "bookings/create",

  async (payload, thunkAPI) => {
    try {
      const response =
        await BookingCustomer.createBooking(payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data ||
        error?.message ||
        "Create booking failed"
      );
    }
  }
);