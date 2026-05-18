import car_images from '../models/car_images.js';

const CarImagesService = {
    async addImage(listing_id, image_url, is_thumbnail = false) {
        try {
            const newImage = await car_images.create(listing_id, image_url, is_thumbnail);
            return newImage;
        } catch (error) {
            throw error;
        }
    },
    async getImagesByListingId(listing_id) {
        try {
            const images = await car_images.findByListingId(listing_id);
            return images;
        } catch (error) {
            throw error;
        }
    },
    async deleteImage(id) {
        try {
            const deleted = await car_images.delete(id);
            return deleted;
        } catch (error) {
            throw error;
        }
    },
    async getallcarlist() {
        try {
            const images = await car_images.getallcarlist();
            return images;
        } catch (error) {
            throw error;
        }
    }
};
export default CarImagesService;    
