import asyncHandler from "express-async-handler";
import File from "../models/file.models.js";
import fs from "fs";

/**
 * @desc This controller saves the file
 * @url http://localhost:5000/files
 * @method POST
 * @formdata file - a single file
 * @return success response or error
 */
const saveFile = asyncHandler(async (req,res)=>{
    try {
        
        if(!req.file){
            res.status(400)
            throw new Error("File not provided")
        }

        const {filename, path, mimetype, size} = req.file;

        const newFile = new File({
            name: filename,
            localPath: path,
            size: size,
            type: mimetype
        })

    await newFile.save();

    res.json({
        code: 200,
        remark:"file saved"
    })

    } catch (error) {
        throw error;
    }
})

/**
 * @desc This controller returns all saved files
 * @url http://localhost:5000/files
 * @method GET
 * @return success response or error
 */
const getFiles = asyncHandler(async (req, res)=>{
    try {
        
        const files = await File.find({}, {localPath: 0})

        res.json({
            code: 200,
            remark:'success',
            data: files
        })

    } catch (error) {
        throw error;
    }
})

/**
 * @desc This controller deletes a single file
 * @url http://localhost:5000/files/:fileId
 * @method DELETE
 * @return success response or error
 */
const deleteFile = asyncHandler(async (req, res)=>{
    try {
        

        const file = await File.findById(req.params.fileId);

       await File.findByIdAndDelete(req.params.fileId)
        
       fs.unlinkSync(file.localPath)

        res.json({
          code: 200,
          remark: "file deleted",
        });

    } catch (error) {
        throw error;
    }
})

export {saveFile, getFiles, deleteFile}
