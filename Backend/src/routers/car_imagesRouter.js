import car_imagesComtroller from '../controllers/car_imagesController.js';
import express from 'express';

const router = express.Router();

router.post('/add', car_imagesComtroller.addImage);
router.get('/listing/:listing_id', car_imagesComtroller.getImagesByListingId);
router.delete('/:id', car_imagesComtroller.deleteImage);
router.get('/allcarlist', car_imagesComtroller.getallcarlist);
export default router;
