import car_embeddingController from '../controllers/car_embedding_vdController.js';
import express from 'express';
const router = express.Router();

router.get('/getallembeddings', car_embeddingController.getAllEmbeddings);
router.post('/:listing_id', car_embeddingController.createCarEmbedding);
router.get('/:listing_id', car_embeddingController.getEmbeddingByListingId);
router.delete('/:id', car_embeddingController.deleteEmbedding);

export default router;