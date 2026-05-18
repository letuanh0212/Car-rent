import car_typeService from "../services/car_type.js";

const CarTypeController = {
    async getallcartype(req, res) {
        try {
            const carTypes = await car_typeService.getallcartype();
            res.json(carTypes);
        } catch (error) {
            console.error(
                "Get all car types error:",
                error
            );
            res.status(500).json({ error: "Failed to retrieve car types" });
        }
    },
    async createCarType(req, res) {
        const { name } = req.body;
        try {
            const newCarType = await car_typeService.createCarType(name);
            res.status(201).json(newCarType);
        } catch (error) {
            console.error(
                "Create car type error:",
                error
            );
            res.status(500).json({ error: "Failed to create car type" });
        }
    }
};
export default CarTypeController;