import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createProduct, getProductById, getProducts } from "../controllers/product.controllers.js";

const router = express.Router();

router.route('/').post(protect, createProduct).get(getProducts);
router.route("/:productId").get(getProductById);

export default router;