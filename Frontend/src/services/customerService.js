import instance  from "../api/api";

const login = async (formData) => {

        const response = await instance.post("/customer/login", formData);  
        return response.data;
};
const register = async (formData) => {

        const response = await instance.post("/customer/register", formData);  
        return response.data;
};

const getCustomerById = async (id) => {

        const response = await instance.get(`/customer/${id}`);  
        return response.data;
};

export default {
    login,
    register,
    getCustomerById
};