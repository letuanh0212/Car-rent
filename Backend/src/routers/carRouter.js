import express from "express";
const router = express.Router();

import CarController from "../controllers/carController.js";
import CarImagesController from "../controllers/car_imagesController.js";
import car_embeddingController from '../controllers/car_embedding_vdController.js';
import authMiddleware from "../middleware/customerMiddleware.js";
import transactionController from "../controllers/transactionController.js";
import accountMiddleware from "../middleware/accountMiddleware.js";
import authAdmin from "../middleware/requireAdmin.js";
import uploadCarImages from "../middleware/uploadCarImages.js";
import uploadCarTransactionImages from "../middleware/uploadCarTransactionImages.js";


router.get('/',  CarController.getAllCarsController);
router.get('/search', CarController.searchCarsController);

// router.post('/', CarController.createCarController);

// router.post('/:id/images', CarImagesController.addImage);

// router.post('/:id/videos', car_embeddingController.createCarEmbedding);

router.get('/:id/videos', car_embeddingController.getEmbeddingByListingId);

router.get('/:id',  CarController.getCarByIdController);
router.put('/:id', authMiddleware, CarController.updateCarController);
router.delete('/:id', authMiddleware, CarController.deleteCarController);

router.post(
  '/transactions',
  accountMiddleware,
  authAdmin,
  uploadCarTransactionImages.array("images", 12),
  transactionController.createCar
);
router.post(
  '/:id/images/upload',
  accountMiddleware,
  authAdmin,
  uploadCarImages.array("images", 12),
  CarImagesController.uploadImages
);
// router.get('/transactions', authMiddleware, transactionController.getAllTransactionsController);
// router.get('/transactions/:id', authMiddleware, transactionController.getTransactionByIdController);
// router.put('/transactions/:id', authMiddleware, transactionController.updateTransactionController);
// router.delete('/transactions/:id', authMiddleware, transactionController.deleteTransactionController);


export default router;
