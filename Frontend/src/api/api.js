import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5080/api/v1',
    withCredentials: false,
});

instance.interceptors.request.use((config) => {

    const adminToken = localStorage.getItem("adminAccessToken");
    const customerToken = localStorage.getItem("customerAccessToken");
    const token = adminToken || customerToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

instance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const refreshToken =
                    localStorage.getItem("customerRefreshToken");

                const response = await axios.post(
                    "http://localhost:5080/api/v1/customer/refresh-token",
                    {
                        refreshToken
                    }
                );

                const newAccessToken =
                    response.data.data.accessToken;

                localStorage.setItem(
                    "customerAccessToken",
                    newAccessToken
                );

                const newRefreshToken =
                    response.data.data.refreshToken;

                if (newRefreshToken) {
                    localStorage.setItem(
                        "customerRefreshToken",
                        newRefreshToken
                    );
                }

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return instance(originalRequest);

            } catch (err) {
              
                localStorage.removeItem("customerAccessToken");
                localStorage.removeItem("customerRefreshToken");

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
