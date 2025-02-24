import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN_PROD,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());

// Routes Import
import menuRouter from "./routes/menu.routes.js";
import reviewRouter from "./routes/review.routes.js";
import cartRouter from "./routes/cart.routes.js";
import userRouter from "./routes/user.routes.js";
import paymentRouter from "./routes/payment.routes.js";

app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/payment", paymentRouter);

export default app;
