import customerInstance from "../Client/axiosCusClient";

const authCustomer = {

    async loginAccountSystem  (formData)  {
        try {
            const response = await customerInstance.post("/customer/login", formData);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error("Login failed");
        }
    },
    async logout() {
        localStorage.removeItem("CustomerAccessToken");
    },
    async register(formData) {
        try {
            const response = await customerInstance.post("/customer/register", formData);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error("Registration failed");
        }
    }   
};

export default authCustomer;