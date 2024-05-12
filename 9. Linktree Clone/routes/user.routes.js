import express from "express";
import { createUser, isAuthenticated, userAuth } from "../controllers/user.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route('/').post(createUser).get(protect, isAuthenticated);
router.route("/auth").post(userAuth);

export default router;