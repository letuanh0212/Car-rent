import { useState } from "react";

import { useDispatch } from "react-redux";

import authApi from "~/apis/customer/authCustomer";

import { loginSuccess } from "~/store/slices/customerAuthSlice";

export default function useCustomerLogin() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const login = async (formData) => {
    try {
      setLoading(true);

      setError("");

      const response =
        await authApi.loginAccountSystem(formData);

      dispatch(
        loginSuccess({
          accessToken: response.accessToken,

          refreshToken: response.refreshToken,

          authType: "customer",
        })
      );

      return response;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err.message ||
        "Login failed";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
}