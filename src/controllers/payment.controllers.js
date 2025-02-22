import Stripe from "stripe";
import asyncHandler from "../utils/asyncHandler.js";
import { stripe } from "../index.js";
import status from "http-status";
import ApiResponse from "../utils/ApiResponse.js";

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
const PaymentControllers = { createPayment };

export default PaymentControllers;
