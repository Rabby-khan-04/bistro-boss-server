import status from "http-status";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { userCollection } from "../controllers/user.controllers.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(status.FORBIDDEN, "Forbidden Access!!");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      throw new ApiError(
        status.UNAUTHORIZED,
        err.message || "Unauthorized Access!!"
      );
    }
    if (decoded) {
      req.user = decoded;
      next();
    }
  });
});

const verifyAdmin = asyncHandler(async (req, _, next) => {
  const email = req.user.email;
  const query = { email };

  const user = await userCollection.findOne(query);
  const isAdmin = user?.role === "admin";
  if (!isAdmin) {
    throw new ApiError(status.UNAUTHORIZED, "Unauthorized Access!!");
  }

  next();
});

const UserMiddlewares = { verifyJWT, verifyAdmin };

export default UserMiddlewares;
