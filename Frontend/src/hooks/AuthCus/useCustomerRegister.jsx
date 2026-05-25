import { useState } from "react";

import authApi from "~/apis/customer/authCustomer";

export default function useCustomerRegister() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const register = async (formData) => {
    try {
      setLoading(true);

      setError("");

      setSuccess(false);

      const response =
        await authApi.register(formData);

      setSuccess(true);

      return response;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Register failed";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
    success,
  };
}