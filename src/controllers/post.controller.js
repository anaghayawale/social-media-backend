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

export { addNewPost };
