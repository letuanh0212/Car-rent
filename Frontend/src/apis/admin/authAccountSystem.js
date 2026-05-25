import AccountIntance from "~/apis/Client/axiosAccountClient";
const authAccountSystem = {
    async login(data) {
        try {
            const response = await AccountIntance.post("/accounts/login", data);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error("Login failed");
        }
    },
    async logout() {
        localStorage.removeItem("accountAccessToken");
    },
    async registerSystem (data){ 
        try{
            const response = await AccountIntance.post("/accounts/register", data);
            return response.data  

        }catch (error){
            throw error.response?.data || new Error("Register failed");
    
        }
    }
};
export default authAccountSystem;