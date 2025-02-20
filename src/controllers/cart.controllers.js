import status from "http-status";
import { database } from "../db/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

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

  const cart = await cartCollection.find(query).toArray();

  return res
    .status(status.OK)
    .json(new ApiResponse(status.OK, cart, "Cart fetched successfully!!"));
});

const CartControllers = { addToCart, getCart };

export default CartControllers;
