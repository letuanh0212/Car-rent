import instance  from "../api/api";

const login = async (formData) => {

        const response = await instance.post("/customer/login", formData);  
        return response.data;
};

export default {
    login
};