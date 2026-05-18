import db from "../config/db.js";

const carImagesRepository = {

    async create(listing_id, image_url, is_thumbnail = false) {

        try {

            const query = `
                INSERT INTO car_images (
                    listing_id,
                    image_url,
                    is_thumbnail
                )
                VALUES ($1, $2, $3)
                RETURNING *;
            `;

            const values = [
                listing_id,
                image_url,
                is_thumbnail
            ];

            const result =
                await db.query(query, values);

            return result.rows[0];

        } catch (error) {

            console.error(
                "Create car image error:",
                error
            );

            throw error;
        }
    },

    async findByListingId(listing_id) {

        try {

            const query = `
                SELECT *
                FROM car_images
                WHERE listing_id = $1
                ORDER BY created_at DESC;
            `;

            const result =
                await db.query(query, [listing_id]);

            return result.rows;

        } catch (error) {

            console.error(
                "Find images error:",
                error
            );

            throw error;
        }
    },

    async delete(id) {

        try {

            const query = `
                DELETE FROM car_images
                WHERE id = $1
                RETURNING *;
            `;

            const result =
                await db.query(query, [id]);

            return result.rows[0];

        } catch (error) {

            console.error(
                "Delete image error:",
                error
            );

            throw error;
        }
    },
    async getallcarlist() {
        try{
            const query = 'SELECT * FROM car_images';
            const result = await db.query(query);
            return result.rows;
        }catch (error) {
            console.error("Get all car images error:", error);
            throw error;
        }
    }
};

export default carImagesRepository;