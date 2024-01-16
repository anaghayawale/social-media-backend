import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", function (next) {
  if (this.isNew) {
    this.comments.forEach((comment) => {
      comment.postId = this._id;
    });
  }
  next();
});

postSchema.pre("find", function (next) {
  this.populate(
    "userId",
    "-password -refreshToken -email -createdAt -updatedAt -followers -posts"
  );
  next();
});

postSchema.pre("updateOne", function (next) {
  if (this.userId == this.userId._id) {
    next();
  }
});

export const Post = mongoose.model("Post", postSchema);
