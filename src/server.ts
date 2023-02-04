import express from "express";
import { env } from "./configs/environments";
import mongoose from "mongoose";
import cors from "cors";

import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import productRoute from "./routes/product";
import cartRoute from "./routes/cart";
import addressRoute from "./routes/address";
import billRoute from "./routes/bill";
import commentRoute from "./routes/comment";
import conversationsRoute from "./routes/conversations";
import messagesRoute from "./routes/messages";

mongoose
  .connect(env.MONGODB_URI || process.env.MONGODB_URI || "", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect to database successfully");
  })
  .then(() => bootApp())
  .catch((err) => {
    console.log("err", err);
    process.exit(1);
  });

const bootApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/api/auth/", authRoute);
  app.use("/api/user/", userRoute);
  app.use("/api/products/", productRoute);
  app.use("/api/carts", cartRoute);
  app.use("/api/addresses", addressRoute);
  app.use("/api/bills", billRoute);
  app.use("/api/comments", commentRoute);
  app.use("/api/conversations", conversationsRoute);
  app.use("/api/messages", messagesRoute);

  app.get("/", (req, res) => {
    res.status(200).send("ACCESS SERVER");
  });

  app.listen(process.env.PORT || env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT || env.PORT}`);
  });
};
