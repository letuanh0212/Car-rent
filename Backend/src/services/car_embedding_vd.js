import car_embeddingRepository from '../models/car_embedding_vd.js';

const CarEmbeddingService = {
    async createCarEmbedding(listing_id, embedding) {
        try {
            const newEmbedding = await car_embeddingRepository.create({ listing_id, embedding });
            return newEmbedding;
        } catch (err) {
            throw err;
        }
    },
    async getEmbeddingByListingId(listing_id) {
        try {
            const embedding = await car_embeddingRepository.getEmbeddingByListingId(listing_id);
            return embedding;
        } catch (err) {
            throw err;
        }
    },
    async deleteEmbedding(id) {
        try {
            const deleted = await car_embeddingRepository.delete(id);
            return deleted;
        } catch (err) {
            throw err;
        }
    },
    async getAllEmbeddings() {
        try {
            const embeddings = await car_embeddingRepository.getAllEmbeddings();
            return embeddings;
        } catch (err) {
            throw err;
        }
    }
};
export default CarEmbeddingService;