import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.models.js";

const addComment = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const { recipeId } = req.params;
  const userId = req.user?._id;

  if (!comment || !rating) {
    throw new ApiError(400, "Review and Rating are required");
  }
  if (!recipeId) {
    throw new ApiError(400, "Recipe Id required");
  }

  if (!isValidObjectId(recipeId)) {
    throw new ApiError(400, "Invalid recipe id");
  }

  if (!userId) {
    throw new ApiError(400, "User Id required");
  }

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id");
  }

  const createdComment = await Comment.create({
    recipeId,
    userId,
    rating,
    comment,
  });

  if (!createdComment) {
    throw new ApiError(500, "Failed to add Comment");
  }

  return res.status(200).json(new ApiResponse(200, createdComment, ""));
});

const getAllComments = asyncHandler(async (req, res) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({ recipeId: recipeId }).populate("userId", "username");

    if (comments.length === 0) {
      throw new ApiError(400, "Failed to fetch Commentss");
    }

    return res.status(200).json(new ApiResponse(200, comments, "Comments fetched successfully"));
  } catch (error) {
    throw new ApiError(400, "There's some problem while getting comments");
  }
});

export { addComment, getAllComments };
