import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        localPath: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON:{
            virtuals: true,
        }
    }
)

fileSchema.virtual('fileUrl').get(function (){
    return `http://localhost:8000/media/${this.name}`
})

const File = mongoose.model("File", fileSchema)

export default File;