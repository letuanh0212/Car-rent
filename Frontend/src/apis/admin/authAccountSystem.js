import AccountIntance from "~/apis/Client/axiosAccountClient";
const authAccountSystem = {
    async login(data) {
        try {
            const response = await AccountIntance.post("/accounts/login", data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async logout() {
        localStorage.removeItem("accountAccessToken");
    },
    async registerSystem (data){ 
        try{
            const response = await AccountIntance.post("/accounts/register", data);
            return response  

        }catch (error){
            throw error;
    
        }
    }
};
export default authAccountSystem;
