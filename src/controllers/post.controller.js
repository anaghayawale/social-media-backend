import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";

// ------------------------- Add New Post -------------------------
const addNewPost = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { image, caption } = req.body;

  if (!caption) {
    throw new ApiError(400, "Incomplete Data");
  }

  const newPost = await Post.create({
    userId,
    image: image || "",
    caption,
  });
  if (!newPost) {
    throw new ApiError(500, "Error in creating post");
  }

  res.status(201).json(new ApiResponse(201, { newPost }, "Post created"));
});

// ------------------------- Update Post -------------------------
const updatePost = asyncHandler(async (req, res, next) => {
  const { postId, image, caption, likes, comments } = req.body;

  if (!(caption && postId)) {
    throw new ApiError(400, "Incomplete Data");
  }
  if (comments) {
    comments.forEach((comment) => {
      if (!(comment.userId && comment.comment)) {
        throw new ApiError(400, "Incomplete Data");
      }
    });
  }
  if (likes) {
    if (likes.length === 0) throw new ApiError(400, "Incomplete Data");
  }

  const existingPost = await Post.findOneAndUpdate(
    { _id: postId },
    {
      image: image || "",
      caption,
      likes,
      comments,
    },
    { new: true }
  );
  if (!existingPost) {
    throw new ApiError(500, "Error in updating post");
  }

  res.status(200).json(new ApiResponse(200, { existingPost }, "Post updated"));
});

export { addNewPost, updatePost };
