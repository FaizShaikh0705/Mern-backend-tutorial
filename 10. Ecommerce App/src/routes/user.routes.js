import express from "express";
import {  getUserDetails, getUserOrders, loginUser, registerUser, updateUser } from "../controllers/user.controllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').post(registerUser);
router.route('/auth').post(loginUser);
router.route("/profile").get(protect, getUserDetails).put(protect,updateUser);
router.route('/:userId/orders').get(protect, getUserOrders)

export default router;