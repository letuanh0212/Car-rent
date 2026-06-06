import AccountIntance from "~/apis/Client/axiosAccountClient";
const authAccountSystem = {
    async login(data) {

            const response = await AccountIntance.post("/accounts/login", data);
            return response;

    },
    async logout() {
        localStorage.removeItem("accountAccessToken");
    },
    async registerSystem (data){ 
            const response = await AccountIntance.post("/accounts/register", data);
            return response  
    }
};
export default authAccountSystem;
