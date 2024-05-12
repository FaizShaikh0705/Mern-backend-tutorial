import express from "express"
import { deleteFile, getFiles, saveFile } from "../controllers/files.controllers.js"
import { upload } from "../middlewares/files.middlewares.js";

const router = express.Router()

router.route('/').post(upload.single('file'), saveFile).get(getFiles);
router.route('/:fileId').delete(deleteFile)

export default router;