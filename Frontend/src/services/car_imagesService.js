import instance from "../api/api";

const CarImagesService = {
    async getAllCarImages() {
        try {
            const response = await instance.get("/car_images/allcarlist");
            return response.data;
        } catch (error) {
            console.error("Get all car images error:", error);
            throw error;
        }
    }
};

export default CarImagesService;
