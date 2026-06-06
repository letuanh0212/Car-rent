import CarImagesService from '../services/car_images.js';

const CarImagesController = {
    async addImage(req, res) {
        try {
            const listing_id = req.params.id || req.body.listing_id;
            const { image_url, is_thumbnail } = req.body;

            if (!listing_id || !image_url) {
                return res.status(400).json({ error: 'listing_id and image_url are required' });
            }

            const newImage = await CarImagesService.addImage(listing_id, image_url, is_thumbnail);
            res.status(201).json(newImage);
        } catch (error) {
            console.error("Add image error:", error);
            res.status(500).json({ error: "Failed to add image" });
        }
    },
    async uploadImages(req, res) {
        try {
            const listing_id = req.params.id;
            const files = req.files || [];

            if (!listing_id || files.length === 0) {
                return res.status(400).json({
                    error: "listing_id and images are required"
                });
            }

            const insertedImages = [];

            for (const [index, file] of files.entries()) {
                const imageUrl =
                    `${req.protocol}://${req.get("host")}/uploads/cars/${listing_id}/${file.filename}`;

                const newImage =
                    await CarImagesService.addImage(
                        listing_id,
                        imageUrl,
                        index === 0
                    );

                insertedImages.push(newImage);
            }

            res.status(201).json({
                success: true,
                data: insertedImages
            });
        } catch (error) {
            console.error("Upload images error:", error);
            res.status(500).json({
                success: false,
                message: error.message || "Failed to upload images"
            });
        }
    },
    async getImagesByListingId(req, res) {
        try {
            const { listing_id } = req.params;
            const images = await CarImagesService.getImagesByListingId(listing_id);
            res.status(200).json(images);
        } catch (error) {
            console.error("Get images error:", error);
            res.status(500).json({ error: "Failed to get images" });
        }
    },
    async deleteImage(req, res) {
        try {
            const { id } = req.params;
            const deleted = await CarImagesService.deleteImage(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Image not found' });
            }
            res.status(200).json(deleted);
        } catch (error) {
            console.error("Delete image error:", error);
            res.status(500).json({ error: "Failed to delete image" });
        }
    },
    async getallcarlist(req, res) {
        try {
            const images = await CarImagesService.getallcarlist();
            res.status(200).json(images);
        } catch (error) {
            console.error("Get all car images error:", error);
            res.status(500).json({ error: "Failed to get all car images" });
        }
    }
};

export default CarImagesController;
