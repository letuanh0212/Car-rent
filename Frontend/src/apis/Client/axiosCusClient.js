import axios from "axios";
const cusInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
cusInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("customerAccessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

cusInstance.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("customerRefreshToken");

        if (!refreshToken) {
          throw new Error("No customer refresh token");
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/customer/refresh-token`,
          { refreshToken }
        );

        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;

        localStorage.setItem("customerAccessToken", newAccessToken);

        if (newRefreshToken) {
          localStorage.setItem("customerRefreshToken", newRefreshToken);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return cusInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("customerAccessToken");
        localStorage.removeItem("customerRefreshToken");

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default cusInstance;