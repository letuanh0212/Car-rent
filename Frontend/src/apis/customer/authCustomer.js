import customerInstance from "../Client/axiosCusClient";

const authCustomer = {

    async loginAccountSystem  (formData)  {

            const response = await customerInstance.post("/customer/login", formData);
            return response;

    },
    async logout() {
        localStorage.removeItem("customerAccessToken");
        localStorage.removeItem("customerRefreshToken");
    },
    async register(formData) {
            const response = await customerInstance.post("/customer/register", formData);
            return response;

    }   
};

export default authCustomer;
