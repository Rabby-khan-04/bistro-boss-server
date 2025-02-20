import status from "http-status";
import { database } from "../db/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const reviewCollection = database.collection("reviews");

const getAllReview = asyncHandler(async (req, res) => {
  const review = await reviewCollection.find().toArray();

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, review, "Review fetched successfully!!"));
});

const ReviewControllers = { getAllReview };

export default ReviewControllers;
