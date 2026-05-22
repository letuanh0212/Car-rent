import { createSlice } from "@reduxjs/toolkit";
import { createBookingThunk } from "../thunks/bookingThunk";

const bookingSlice = createSlice({
   name: "booking",

   initialState: {
      booking: null,
      loading: false,
      error: null,
   },

   reducers: {},

   extraReducers: (builder) => {
      builder

      .addCase(createBookingThunk.pending, (state) => {
         state.loading = true;
         state.error = null;
      })

      .addCase(createBookingThunk.fulfilled, (state, action) => {
         state.loading = false;
         state.booking = action.payload;
      })

      .addCase(createBookingThunk.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      });
   },
});

export default bookingSlice.reducer;
