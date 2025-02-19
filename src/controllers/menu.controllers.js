import status from "http-status";
import { database } from "../db/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const menuCollection = database.collection("menu");

const getAllMenu = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const skip = limit * page;
  let query;

  if (category === "all") {
    query = {};
  } else {
    query = { category };
  }

  console.log(query);

  const menu = await menuCollection
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, menu, "Menu fetched successfully!!"));
});

const getMenuCount = asyncHandler(async (req, res) => {
  const { category } = req.params;
  let count;

  if (category === "all") {
    count = await menuCollection.estimatedDocumentCount();
  } else {
    count = await menuCollection.countDocuments({ category });
  }

  return res
    .status(status.OK)
    .json(
      new ApiResponse(status.OK, count, "Product count fetched successfully!!")
    );
});

const MenuControllers = { getAllMenu, getMenuCount };

export default MenuControllers;
