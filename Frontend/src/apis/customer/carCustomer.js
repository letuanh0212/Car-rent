import cusInstance from "~/apis/Client/axiosCusClient";

const carCustomer = {
    async getCarList() {
        try {
            const response = await cusInstance.get("/cars");
            return response.data;
        }
        catch (error) {
            throw error.response?.data || new Error("Failed to fetch car list");
        }   
    },
    async getCarDetails(carId) {
        try {
            const response = await cusInstance.get(`/cars/${carId}`);
            return response.data;
        }
        catch (error) {
            throw error.response?.data || new Error("Failed to fetch car details");
        }
    }
};

export default carCustomer;