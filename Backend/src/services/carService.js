import car from '../models/car.js';

const CarService = {
    async createCar(data) {
        try {
            const newCar = await car.create(data);
            return newCar;
        } catch (error) {
            throw error;
        }
    },
    async getAllCars() {
        try {
            const cars = await car.getAll();
            return cars;
        }catch (error) {
            throw error;
        }
    },
    async getCarById(id) {
        try {
            const carData = await car.getById(id);
            return carData; 
        } catch (error) {
            throw error;
        }  
     },
    async updateCar(id, data) {
        try {
            const updatedCar = await car.update(id, data);
            return updatedCar;     
        } catch (error) {
            throw error;
        }
    },
    async deleteCar(id) {
        try {
            const deletedCar = await car.delete(id);
            return deletedCar;
        } catch (error) {
            throw error;
        }
    },
    async searchCars(searchParams) {
        try {
            const cars = await car.searchCars(searchParams);
            return cars;
        } catch (error) {
            throw error;
        }
    }
};
export default CarService;
