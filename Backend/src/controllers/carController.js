import carService from "../services/carService.js";
const carController = {
    async createCarController(req, res) {
        try {
            const data = req.body;
            const newCar = await carService.createCar(data);
            res.status(201).json({ success: true, data: newCar });
         } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async getAllCarsController(req, res) {
        try {
            const cars = await carService.getAllCars();
            res.status(200).json({ success: true, data: cars });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async getCarByIdController(req, res) {
        try {
            const { id } = req.params;
            const carData = await carService.getCarById(id);
            if (!carData) {
                return res.status(404).json({ success: false, message: 'Car not found' });
            }
            res.status(200).json({ success: true, data: carData });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async updateCarController(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedCar = await carService.updateCar(id, data);
            if (!updatedCar) {
                return res.status(404).json({ success: false, message: 'Car not found' });
            }
            res.status(200).json({ success: true, data: updatedCar });
        }
            catch (error)   {
            res.status(500).json({ success: false, message: error.message });
           }
    },
    async deleteCarController(req, res) {
        try {            
            const { id } = req.params;
            const deletedCar = await carService.deleteCar(id);
            if (!deletedCar) {
                return res.status(404).json({ success: false, message: 'Car not found' });
            }   
            res.status(200).json({ success: true, data: deletedCar });
        }catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async searchCarsController(req, res) {
        try {
            const searchParams = req.query;
            const cars = await carService.searchCars(searchParams);
            res.status(200).json({ success: true, data: cars });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async searchCars({ make, model, year, keyword }) {
        const query = {};

        // search keyword tổng (giống Netflix / Shopee)
        if (keyword) {
        query.$or = [
            { make: { $regex: keyword, $options: "i" } },
            { model: { $regex: keyword, $options: "i" } },
        ];
        }

        // filter riêng
        if (make) query.make = { $regex: make, $options: "i" };
        if (model) query.model = { $regex: model, $options: "i" };
        if (year) query.year = Number(year);

        return await Car.find(query).limit(20);
    },
};
export default carController;
