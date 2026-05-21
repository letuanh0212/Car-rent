import { useState } from "react";
import authApi from "~/apis/authCustomer";

export default function useCustomerLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await authApi.loginAccountSystem(formData);

      localStorage.setItem(
        "CustomerAccessToken",
        response.accessToken
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