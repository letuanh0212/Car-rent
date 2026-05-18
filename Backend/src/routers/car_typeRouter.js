import express from "express";
const router = express.Router();
import CarTypeController from "../controllers/car_typeController.js";

router.get("/", CarTypeController.getallcartype);
router.post("/", CarTypeController.createCarType);

export default router;