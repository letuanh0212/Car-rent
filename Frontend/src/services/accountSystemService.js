import api  from "../api/api.js";

const loginAccountSystem = async (formData) => {
    try {
        const response = await api.post("/accounts/login", formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("Login failed");
    }
};
const logout = () => {
    localStorage.removeItem("adminAccessToken");
};

const register = async (formData) => {
    try {
        const response = await api.post("/accounts/register", formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("Registration failed");
    }
};

export default {
    loginAccountSystem,
    logout,
    register
};