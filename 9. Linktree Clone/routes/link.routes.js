import express from "express";
import { createLink, deleteLinkById, getLinksByUsername, updateLinkById } from "../controllers/link.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";
const router = express.Router();


router.route('/').post(protect, createLink);
router.route('/:username').get(getLinksByUsername)
router.route('/:linkId').delete(protect, deleteLinkById).put(protect, updateLinkById)

export default router;