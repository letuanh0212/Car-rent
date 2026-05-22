import AccountIntance from "./instance/AccountInstance";
const authAccountSystem = {
    async login(data) {
        try {
            const response = await AccountIntance.post("/account/login", data);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error("Login failed");
        }
    },
    async logout() {
        localStorage.removeItem("accountAccessToken");
    }
};
export default authAccountSystem;