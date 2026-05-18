import DB from '../config/db.js';
const CarEmbeddingRepository = {
    async create(carEmbedding) {
        const { listing_id, embedding } = carEmbedding;
        const query = 'INSERT INTO car_embedding_videos (listing_id, embedding) VALUES ($1, $2) RETURNING *';
        const values = [listing_id, embedding];
        try {
            const res = await DB.query(query, values);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
    async getEmbeddingByListingId(listing_id) {
        const query = 'SELECT * FROM car_embedding_videos WHERE listing_id = $1';
        try {
            const res = await DB.query(query, [listing_id]);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
    async delete(id) {
        const query = 'DELETE FROM car_embedding_videos WHERE id = $1 RETURNING *';
        try {
            const res = await DB.query(query, [id]);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
    async getAllEmbeddings() {
        const query = 'SELECT * FROM car_embedding_videos';
        try {
            const res = await DB.query(query);
            return res.rows;
        } catch (err) {
            throw err;
        }
    }
};
export default CarEmbeddingRepository;


