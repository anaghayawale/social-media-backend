import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";
import { bodyDataExists } from "../utils/validation/bodyData.js";

// ------------------------- Add New Post -------------------------
const addNewPost = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { image, caption } = req.body;

  if (bodyDataExists(caption)) {
    throw new ApiError(400, "Incomplete Data");
  }

  const newPost = await Post.create({
    userId,
    image: image,
    caption,
  });
  if (!newPost) {
    throw new ApiError(500, "Error in creating post");
  }

  res.status(201).json(new ApiResponse(201, { newPost }, "Post created"));
});

// ------------------------- Update self Post -------------------------
const updatePost = asyncHandler(async (req, res, next) => {
  const { postId, caption } = req.body;
  const userIdFromToken = req.user._id;

  if (bodyDataExists(postId && caption)) {
    throw new ApiError(400, "Incomplete Data");
  }

  const existingPost = await Post.findOne({
    _id: postId,
    userId: userIdFromToken,
  });
  if (!existingPost) {
    throw new ApiError(500, "Post not found");
  }

  existingPost.caption = caption;
  const updatedPost = await existingPost.save();

  if (!updatedPost) {
    throw new ApiError(500, "Error in updating post");
  }

  res.status(200).json(new ApiResponse(200, { updatedPost }, "Post updated"));
});

// ------------------------- Delete Self Post -------------------------
const deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.body;
  const userIdFromToken = req.user._id;

  if (!postId) {
    throw new ApiError(400, "Incomplete Data");
  }

  const existingPost = await Post.findOne({
    _id: postId,
    userId: userIdFromToken,
  });
  if (!existingPost) {
    throw new ApiError(500, "Post not found for this user");
  }

  const deleteResult = await existingPost.deleteOne();
  if (deleteResult.deletedCount === 0) {
    throw new ApiError(500, "Error in deleting post");
  }

  res.status(200).json(new ApiResponse(200, {}, "Post deleted"));
});

// ------------------------- get All Posts (self) -------------------------
const getAllPosts = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const posts = await Post.find({ userId }).sort({ createdAt: -1 });
  if (!posts) {
    throw new ApiError(500, "Error in fetching posts");
  }

  res.status(200).json(new ApiResponse(200, { posts }, "Posts fetched"));
});

export { addNewPost, updatePost, deletePost, getAllPosts };
