import express from "express";
const router = express.Router();
import CarController from "../controllers/carController.js";
import CarImagesController from "../controllers/car_imagesController.js";
import car_embeddingController from '../controllers/car_embedding_vdController.js';
import authMiddleware from "../middleware/customerMiddleware.js";


router.get('/',  CarController.getAllCarsController);
router.get('/search', CarController.searchCarsController);

router.post('/', CarController.createCarController);
router.post('/:id/images', CarImagesController.addImage);
router.post('/:id/videos', car_embeddingController.createCarEmbedding);
router.get('/:id/videos', car_embeddingController.getEmbeddingByListingId);

router.get('/:id',  CarController.getCarByIdController);
router.put('/:id', authMiddleware, CarController.updateCarController);
router.delete('/:id', authMiddleware, CarController.deleteCarController);


export default router;