import { createAsyncThunk } from "@reduxjs/toolkit";
import authAccountSystem from "~/apis/admin/authAccountSystem";

export const loginThunk = createAsyncThunk(
  "/loginsystem",
  async (data, thunkAPI) => {
    try {
      const response = await authAccountSystem.login(data);

      if (response?.accessTokenaccount) {
        localStorage.setItem("accountAccessToken", response.accessTokenaccount);
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const registerSystemThunk = createAsyncThunk(
  "accounts/registerSystem",
  async (data, thunkAPI) => {
    try {
      const response = await authAccountSystem.registerSystem(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutThunk = createAsyncThunk("accounts/logout", async () => {
  await authAccountSystem.logout();
  return true;
});