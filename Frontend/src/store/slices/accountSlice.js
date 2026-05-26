import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  registerSystemThunk,
} from "../thunks/authAccountThunk";

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

const accountToken = localStorage.getItem("accountAccessToken");

const initialState = {
  account: accountToken ? decodeJWT(accountToken) : null,
  accessToken: accountToken || null,
  isAuthenticated: Boolean(accountToken),
  loading: false,
  error: null,
  success: false,
};

const accountAuthSlice = createSlice({
  name: "accountAuth",
  initialState,
  reducers: {
    clearAccountAuthError: (state) => {
      state.error = null;
    },

    resetAccountAuthSuccess: (state) => {
      state.success = false;
    },

    accountLogout: (state) => {
      state.account = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = false;

      localStorage.removeItem("accountAccessToken");
      localStorage.removeItem("accountRefreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        const accessToken =
          action.payload?.accessToken ||
          action.payload?.accessTokenaccount ||
          action.payload?.data?.accessToken ||
          action.payload?.data?.accessTokenaccount;

        state.loading = false;
        state.success = true;
        state.accessToken = accessToken || null;
        state.account = accessToken ? decodeJWT(accessToken) : null;
        state.isAuthenticated = Boolean(accessToken);

        if (accessToken) {
          localStorage.setItem("accountAccessToken", accessToken);
        }
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Login failed";
      })

      .addCase(registerSystemThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerSystemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
          action.payload?.message || action.payload || "Register success";
      })

      .addCase(registerSystemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Register failed";
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.account = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        state.success = false;
      });
  },
});

export const {
  clearAccountAuthError,
  resetAccountAuthSuccess,
  accountLogout,
} = accountAuthSlice.actions;

export default accountAuthSlice.reducer;