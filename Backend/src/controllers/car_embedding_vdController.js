import car_embeddingService from '../services/car_embedding_vd.js';
const CarEmbeddingController = {
    async createCarEmbedding(req, res) {
        try {
            const listing_id = req.params.id || req.params.listing_id || req.body.listing_id;
            const { embedding } = req.body;
            if (!listing_id || !embedding) {
                return res.status(400).json({ error: 'listing_id and embedding are required' });
            }
            const newEmbedding = await car_embeddingService.createCarEmbedding(listing_id, embedding);
            res.status(201).json(newEmbedding);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getEmbeddingByListingId(req, res) {
        try {
            const listing_id = req.params.id || req.params.listing_id;
            const embedding = await car_embeddingService.getEmbeddingByListingId(listing_id);
            if (!embedding) {
                return res.status(404).json({ error: 'Embedding not found' });
            }
            res.status(200).json(embedding);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async deleteEmbedding(req, res) {
        try {
            const { id } = req.params;
            const deleted = await car_embeddingService.deleteEmbedding(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Embedding not found' });
            }
            res.status(200).json(deleted);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getAllEmbeddings(req, res) {
        try {
            const embeddings = await car_embeddingService.getAllEmbeddings();
            res.status(200).json(embeddings);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
export default CarEmbeddingController;
