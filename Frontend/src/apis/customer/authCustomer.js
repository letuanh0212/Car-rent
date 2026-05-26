import customerInstance from "../Client/axiosCusClient";

const authCustomer = {

    async loginAccountSystem  (formData)  {
        try {
            const response = await customerInstance.post("/customer/login", formData);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async logout() {
        localStorage.removeItem("customerAccessToken");
        localStorage.removeItem("customerRefreshToken");
    },
    async register(formData) {
        try {
            const response = await customerInstance.post("/customer/register", formData);
            return response;
        } catch (error) {
            throw error;
        }
    }   
};

export default authCustomer;
