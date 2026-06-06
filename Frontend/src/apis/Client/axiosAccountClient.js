import axios from "axios";
const accountInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
accountInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accountAccessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

accountInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accountAccessToken");
      localStorage.removeItem("accountRefreshToken");

      window.location.href = "/account/login";
    }

    return Promise.reject(error.response?.data || error);
  }
);
export default accountInstance;