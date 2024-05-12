import Link from "../models/link.models.js";
import asyncHandler from "express-async-handler";
import User from "../models/user.models.js";

const createLink = asyncHandler(async (req, res, next)=>{
    try {
        

        const {data} = req.body;

        if(!data){
            const error = new Error("Links not present");
            next(error);
            return;
        }


        if(data.length > 5){
            const error = new Error("Links can not be more than 5");
            next(error);
            return;
        }

        for(let i = 0; i < data.length ; i++){
            if(data[i]['title'] && data[i]['link'] && req.user._id){
                const newLink = new Link(
                    {
                        title: data[i]['title'],
                        link: data[i]['link'],
                        createdBy: req.user._id
                    }
                    );
                await newLink.save()
            }
        }

        res.json({
            remark:'Links created'
        })


    } catch (error) {
        next(error)
    }
})

const getLinksByUsername = asyncHandler(async(req, res, next)=>{
    try {

        const user = await User.findOne({username: req.params.username})
        
        if(!user){
            res.status(404)
            const error = Error("User not found")
            next(error);
            return;
        }

        const links = await Link.find({createdBy: user._id});
        
        res.json({
            remark:"success",
            data: links
        })

    } catch (error) {
        next(error)
    }
})

const deleteLinkById = asyncHandler(async (req, res, next)=>{
    try {
        
        const linkToDelete = await Link.findById(req.params.linkId);
        
        if(req.user._id !== linkToDelete.createdBy){
            const error = new Error("You are not authorized to delete this link")
            next(error);
            return;
        }
        
        await Link.findByIdAndDelete(req.params.linkId);
        
        res.json({
            remark: "link deleted",
          });
    } catch (error) {
        next(error)
    }
})

const updateLinkById = asyncHandler(async (req, res, next)=>{
    try {

        const linkToUpdate = await Link.findById(req.params.linkId);
        
        if(req.user._id !== linkToDelete.createdBy){
            const error = new Error("You are not authorized to update this link")
            next(error);
            return;
        }

        linkToUpdate.title = req.body.title || link.title;
        linkToUpdate.link = req.body.link || link.link;

        await linkToUpdate.save();

        res.json({
            remark:"Link updated"
        })
        

    } catch (error) {
        next(error)
    }
})

export {createLink,getLinksByUsername, deleteLinkById, updateLinkById}