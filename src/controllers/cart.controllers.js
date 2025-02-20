import status from "http-status";
import { database } from "../db/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ObjectId } from "mongodb";

const cartCollection = database.collection("carts");

const addToCart = asyncHandler(async (req, res) => {
  const cartItem = req.body;
  const result = await cartCollection.insertOne(cartItem);

  return res
    .status(status.CREATED)
    .json(new ApiResponse(status.OK, result, "Item added to cart!!"));
});

const getCart = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const query = { email };

  const cart = await cartCollection
    .aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "menu",
          localField: "menuId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
    ])
    .toArray();

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, cart, "Cart fetched successfully!!"));
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };

  const result = await cartCollection.deleteOne(query);

  return res
    .status(status.OK)
    .json(
      new ApiResponse(status.OK, result, "Cart item deleted successfully!!")
    );
});

const CartControllers = { addToCart, getCart, deleteCartItem };

export default CartControllers;
