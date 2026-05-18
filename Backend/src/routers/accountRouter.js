import express from "express";
const router = express.Router();
import UserController from "../controllers/accountController.js";


router.post('/register', UserController.registerController);
router.post('/login', UserController.loginController);

export default router;  