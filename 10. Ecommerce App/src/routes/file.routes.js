import express from "express";
import { upload } from "../middlewares/file.middlewares.js";
import { uploadFile } from "../utils/helper.js";


const router = express.Router();

router.route("/").post(upload.single("file"), async (req, res, next)=>{

    if(!req.file){
        return next(new Error("please send a file to upload"))
    }

    const image = await uploadFile(req.file.path,`products/${req.file.filename}`);

    res.json({fileLink: image[0].metadata.mediaLink});
})

export default router;
