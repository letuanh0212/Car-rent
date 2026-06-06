import cusInstance from "~/apis/Client/axiosCusClient";

const carCustomer = {
    async getCarList() {

            const response = await cusInstance.get("/cars");
            return response;

    },
    async getCarDetails(carId) {

            const response = await cusInstance.get(`/cars/${carId}`);
            return response;
    }
};  

export default carCustomer;
