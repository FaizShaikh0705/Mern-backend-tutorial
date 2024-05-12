import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createOrder, getOrderById, verifyAndUpdateToPaid } from "../controllers/order.controllers.js";

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route("/:orderId").get(protect, getOrderById).put(protect, verifyAndUpdateToPaid)

export default router;