import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const postSchema = new Schema(
    {
        userId : {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        caption: {
            type: String,
        },
        // tags: [{
        //     type: String,
        // }],
        likes: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        comments: [commentSchema],
        

    }, 
    {
        timestamps: true,
    }
)

export const Post = mongoose.model("Post", postSchema);