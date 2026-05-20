import express from "express";
const router = express.Router();
import customerController from "../controllers/customerController.js";
import authMiddleware from "../middleware/customerMiddleware.js";

router.post('/register', customerController.registerCustomerController);
router.post('/login', customerController.loginCustomerController);
router.post('/refresh-token', customerController.refreshTokenController);
router.post('/refresh', customerController.refreshTokenController);

router.get('/', authMiddleware, customerController.getAllCustomersController);
router.get('/:id',authMiddleware, customerController.getCustomerByIdController);
export default router;
