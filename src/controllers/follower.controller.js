import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Follower } from "../models/follower.model.js";

// ------------------------- Follow user -------------------------
const followUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  const userIdFromToken = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Incomplete Data");
  }

  if (userId == userIdFromToken) {
    throw new ApiError(400, "Cannot follow self");
  }

  const existingFollower = await Follower.findOne({
    userId: userIdFromToken,
    follower: userId,
  });
  if (existingFollower) {
    throw new ApiError(500, "User already followed");
  }

  const userFollowed = await Follower.create({
    userId: userIdFromToken,
    follower: userId,
  });
  if (!userFollowed) {
    throw new ApiError(500, "Error in following user");
  }

  res.status(200).json(new ApiResponse(200, { userFollowed }, "User followed"));
});

// ------------------------- Unfollow user -------------------------
const unfollowUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  const userIdFromToken = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Incomplete Data");
  }

  if (userId == userIdFromToken) {
    throw new ApiError(400, "Cannot unfollow self");
  }

  const existingFollower = await Follower.findOne({
    userId: userIdFromToken,
    follower: userId,
  });
  if (!existingFollower) {
    throw new ApiError(500, "User already unfollowed");
  }

  const userUnfollowed = await Follower.deleteOne({
    userId: userIdFromToken,
    follower: userId,
  });
  if (!userUnfollowed) {
    throw new ApiError(500, "Error in unfollowing user");
  }

  res.status(200).json(new ApiResponse(200, {}, "User unfollowed"));
});

// ------------------------- Get all followers -------------------------
const getAllFollowers = asyncHandler(async (req, res, next) => {
  const userIdFromToken = req.user._id;

  const followers = await Follower.find({ userId: userIdFromToken }).populate(
    "follower"
  );
  if (!followers) {
    throw new ApiError(500, "Error in getting followers");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { followers }, "Followers fetched"));
});

export { followUser, unfollowUser, getAllFollowers };
