import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  registerSystemThunk,
} from "../thunks/authAccountThunk";

const initialState = {
  account: null,
  accessToken: localStorage.getItem("accountAccessToken") || null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    resetAuthSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.account = action.payload?.account || action.payload?.data || null;
        state.accessToken = action.payload?.accessToken || null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Login failed";
      })

      // REGISTER
      .addCase(registerSystemThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSystemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.account = action.payload?.account || action.payload?.data || null;
      })
      .addCase(registerSystemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Register failed";
      })

      // LOGOUT
      .addCase(logoutThunk.fulfilled, (state) => {
        state.account = null;
        state.accessToken = null;
        state.loading = false;
        state.error = null;
        state.success = false;
      });
  },
});

export const { clearAuthError, resetAuthSuccess } = authSlice.actions;

export default authSlice.reducer;