import CarTypeRepository from "../models/car_type.js";

const CarTypeService = {
    async getallcartype() {
        try {
            const carTypes = await CarTypeRepository.getallcartype();
            return carTypes;
        } catch (error) {
            console.error(
                "Get all car types error:",
                error
            );
            throw error;
        }
    },
    async createCarType(name) {
        try {
            const newCarType = await CarTypeRepository.create({ name });
            return newCarType;
        } catch (error) {
            console.error(
                "Create car type error:",
                error
            );
            throw error;
        }
    }
};

export default CarTypeService;
