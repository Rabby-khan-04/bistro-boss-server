import Stripe from "stripe";
import asyncHandler from "../utils/asyncHandler.js";
import status from "http-status";
import ApiResponse from "../utils/ApiResponse.js";
import { database } from "../db/index.js";
import { ObjectId } from "mongodb";
import { cartCollection } from "./cart.controllers.js";
import ApiError from "../utils/ApiError.js";

export const paymentCollection = database.collection("orders");
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = asyncHandler(async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  return res
    .status(status.OK)
    .json(
      new ApiResponse(
        status.OK,
        { clientSecret: paymentIntent.client_secret },
        "Payment successfull!!"
      )
    );
});

const saveOrder = asyncHandler(async (req, res) => {
  const orderInfo = req.body;
  const order = await paymentCollection.insertOne(orderInfo);

  const query = {
    _id: {
      $in: orderInfo.cartId.map((id) => new ObjectId(id)),
    },
  };

  const result = await cartCollection.deleteMany(query);

  return res
    .status(status.CREATED)
    .json(
      new ApiResponse(
        status.OK,
        { order, deleted: result },
        "Order placed successfully!!"
      )
    );
});

const getOrderHistory = asyncHandler(async (req, res) => {
  const { email } = req.params;

  if (req.user.email !== email) {
    throw new ApiError(status.UNAUTHORIZED, "Unauthorized Access!!");
  }

  const query = { email };

  const result = await paymentCollection.find(query).toArray();

  return res
    .status(status.OK)
    .json(
      new ApiResponse(
        status.OK,
        result,
        "Orders fetched successfully successfull!!"
      )
    );
});

const PaymentControllers = { createPayment, saveOrder, getOrderHistory };

export default PaymentControllers;
