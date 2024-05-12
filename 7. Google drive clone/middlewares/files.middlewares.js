import multer from "multer"
import path from "path"
import { formatDate } from "../utils/helper.js";

/**
 * @desc this is multer disk configurations to determine file location and file name
 */
const storage = multer.diskStorage({
    destination: 'myFiles/',
    filename: function (req, file, cb){

        const fileName = file.originalname.replace(/\.[^/.]+$/, "") + formatDate(new Date()) + path.extname(file.originalname);

        cb(null, fileName)
    }
})

/**
 * @desc this upload method runs for each file, it has some multer configs to filter file
 */
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        const acceptedFiles = ['.png', '.json','.html','.pdf','.jpg']

        const fileExtension = path.extname(file.originalname)

        if(acceptedFiles.includes(fileExtension)){
            cb(null, true)
        } else{
            cb(new Error("This file type is not supported"))
        }
    }
})

export { upload }