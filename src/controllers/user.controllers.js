import status from "http-status";
import { database } from "../db/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../constants.js";

const userCollection = database.collection("user");

const createAUser = asyncHandler(async (req, res) => {
  const userInfo = req.body;
  userInfo.role = "user";

  const existingUser = await userCollection.findOne({ email: userInfo.email });

  if (existingUser) {
    throw new ApiError(status.CONFLICT, "User with email already exists!!");
  }

  const result = await userCollection.insertOne(userInfo);

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, result, "User registred successfully!!"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await userCollection.find({}).toArray();

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, user, "Users fetched successfully!!"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };

  const result = await userCollection.deleteOne(query);
  return res
    .status(status.OK)
    .json(status.OK, result, "User deleted successfully!!");
});

const makeAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      role: "admin",
    },
  };
  const result = await userCollection.updateOne(query, updatedDoc);

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, result, "User role updated successfully"));
});

const issueJWT = asyncHandler(async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });

  return res
    .status(status.OK)
    .cookie("token", token, cookieOptions)
    .json(new ApiResponse(status.OK, token, "Issued token"));
});

const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(status.OK)
    .clearCookie("token", { ...cookieOptions, maxAge: 0 })
    .json(new ApiResponse(status.OK, { success: true }, "Success"));
});

const UserControllers = {
  createAUser,
  getAllUsers,
  deleteUser,
  makeAdmin,
  issueJWT,
  logoutUser,
};

export default UserControllers;
