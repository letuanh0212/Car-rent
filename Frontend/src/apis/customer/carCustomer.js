import cusInstance from "~/apis/Client/axiosCusClient";

const carCustomer = {
    async getCarList() {
        try {
            const response = await cusInstance.get("/cars");
            return response;
        }
        catch (error) {
            throw error;
        }   
    },
    async getCarDetails(carId) {
        try {
            const response = await cusInstance.get(`/cars/${carId}`);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};  

export default carCustomer;
