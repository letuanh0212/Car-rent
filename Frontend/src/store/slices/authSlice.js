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

const adminToken = localStorage.getItem(
  "adminAccessToken"
);

const token = customerToken || adminToken;

const initialState = {
  token: token || null,

  user: token ? decodeJWT(token) : null,

  authType: adminToken
    ? "admin"
    : customerToken
    ? "customer"
    : null,

  isAuthenticated: Boolean(token),
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
            localStorage.removeItem("accountAccessToken");
            localStorage.removeItem("accountRefreshToken");

            localStorage.setItem("customerAccessToken", accessToken);

            if (refreshToken) {
                localStorage.setItem("customerRefreshToken", refreshToken);
            }
        }

        if (authType === "admin") {
            localStorage.removeItem("customerAccessToken");
            localStorage.removeItem("customerRefreshToken");

            localStorage.setItem("accountAccessToken", accessToken);

            if (refreshToken) {
                localStorage.setItem("accountRefreshToken", refreshToken);
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

      localStorage.removeItem(
        "accountAccessToken"
      );

      localStorage.removeItem(
        "accountRefreshToken"
      );
    },
  },
});

export const {
  loginSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;