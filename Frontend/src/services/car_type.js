import instance from "../api/api";

const CarTypeService = {
    async getAllCarTypes() {
        try {
            const response = await instance.get("/car_types");
            return response.data;
        } catch (error) {
            console.error("Error fetching car types:", error);
            throw error;
        }
    }
};

export default CarTypeService;