import { useDispatch, useSelector } from "react-redux";

import {
  loginThunk,
  registerSystemThunk,
  logoutThunk,
} from "~/store/thunks/authAccountThunk";

export default function useAccountAuth() {
  const dispatch = useDispatch();

  const {
    account,
    accessToken,
    loading,
    error,
    success,
  } = useSelector((state) => state.account);

  const login = async (data) => {
    const result = await dispatch(loginThunk(data));

    if (loginThunk.fulfilled.match(result)) {
      return {
        success: true,
        data: result.payload,
      };
    }

    return {
      success: false,
      error: result.payload || result.error?.message,
    };
  };


  const register = async (data) => {
    const result = await dispatch(registerSystemThunk(data));

    if (registerSystemThunk.fulfilled.match(result)) {
      return {
        success: true,
        data: result.payload,
      };
    }

    return {
      success: false,
      error: result.payload || result.error?.message,
    };
  };

  const logout = async () => {
    await dispatch(logoutThunk());
  };

  return {
    account,
    accessToken,
    loading,
    error,
    success,

    login,
    register,
    logout,
  };
}