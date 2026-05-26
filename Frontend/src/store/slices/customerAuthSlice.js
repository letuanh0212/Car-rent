import { createSlice } from "@reduxjs/toolkit";

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

const customerToken = localStorage.getItem(
  "customerAccessToken"
);

const initialState = {
  token: customerToken || null,

  user: customerToken ? decodeJWT(customerToken) : null,

  authType: customerToken ? "customer" : null,

  isAuthenticated: Boolean(customerToken),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const {
        accessToken,
        refreshToken,
        authType,
      } = action.payload;

      state.token = accessToken;

      state.user = decodeJWT(accessToken);

      state.authType = authType;

      state.isAuthenticated = true;

      if (authType === "customer") {
        localStorage.setItem("customerAccessToken", accessToken);

        if (refreshToken) {
          localStorage.setItem("customerRefreshToken", refreshToken);
        }
      }
    },

    logout: (state) => {
      state.token = null;

      state.user = null;

      state.authType = null;

      state.isAuthenticated = false;

      localStorage.removeItem(
        "customerAccessToken"
      );

      localStorage.removeItem(
        "customerRefreshToken"
      );

    },
  },
});

export const {
  loginSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
