import mongoose from "mongoose";

const linkSchema = mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        createdOn:{
            type: Number,
            default: Date.now()
        }
        
    }
)

const Link = mongoose.model('Link', linkSchema)

export default Link;