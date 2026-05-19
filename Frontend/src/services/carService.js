import instance from "../api/api";

const createCar = async (formData) => {
    try {
        const response = await instance.post("/cars", formData);
        return response.data;
    } catch (error) {
        console.error("Create car error:", error);
        throw error;
    }
};

const getAllCars = async () => {
    try {
        const response = await instance.get("/cars");
        return response.data;
    } catch (error) {
        console.error("Get all cars error:", error);
        throw error;
    }
};

const getCarById = async (id) => {
    try {
        const response = await instance.get(`/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get car by id error:", error);
        throw error;
    }
};

const searchCars = async (searchParams) => {
    try {
        const response = await instance.get("/cars/search", { params: searchParams });
        return response.data;
    } catch (error) {
        console.error("Search cars error:", error);
        throw error;
    }
};

const updateCar = async (id, formData) => {
    try {
        const response = await instance.put(`/cars/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Update car error:", error);
        throw error;
    }
};

const deleteCar = async (id) => {
    try {
        const response = await instance.delete(`/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete car error:", error);
        throw error;
    }
};

export default {
    createCar,
    getAllCars,
    getCarById,
    searchCars,
    updateCar,
    deleteCar
};
