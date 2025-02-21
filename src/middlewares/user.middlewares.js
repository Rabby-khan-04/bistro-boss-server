import status from "http-status";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const token = req?.cookies?.token || req.headers.authorization.split(" ")[1];

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

const UserMiddlewares = { verifyJWT };

export default UserMiddlewares;
