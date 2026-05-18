import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5080/api/v1',
    withCredentials: false,
});

instance.interceptors.request.use((config) => {

    const token = localStorage.getItem("accessToken");

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
                    localStorage.getItem("refreshToken");

                const response = await axios.post(
                    "http://localhost:5080/api/v1/customer/refresh-token",
                    {
                        refreshToken
                    }
                );

                const newAccessToken =
                    response.data.data.accessToken;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return instance(originalRequest);

            } catch (err) {
              
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default instance;