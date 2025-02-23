import status from "http-status";
import { database } from "../db/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ObjectId } from "mongodb";

export const menuCollection = database.collection("menu");

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

const addAMenuItem = asyncHandler(async (req, res) => {
  const menuItem = req.body;
  const result = await menuCollection.insertOne(menuItem);

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, result, "Product added successfully!!"));
});

const deleteMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await menuCollection.deleteOne(query);

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, result, "Product deleted successfully!!"));
});

const getAMenuData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = { _id: id };
  const menu = await menuCollection.findOne(query);
  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, menu, "Product fetched successfully!!"));
});

const updateMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const { name, price, recipe, category, image } = req.body;
  const query = { _id: id };
  const updatedDco = {
    $set: {
      name,
      price,
      recipe,
      category,
      image,
    },
  };

  const result = await menuCollection.updateOne(query, updatedDco);

  console.log(result);

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, result, "Product updated successfully!!"));
});

const MenuControllers = {
  getAllMenu,
  getMenuCount,
  addAMenuItem,
  deleteMenuItem,
  getAMenuData,
  updateMenuItem,
};

export default MenuControllers;
