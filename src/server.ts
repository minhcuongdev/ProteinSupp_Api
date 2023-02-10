import express from "express";
import { env } from "./configs/environments";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";

import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import productRoute from "./routes/product";
import cartRoute from "./routes/cart";
import addressRoute from "./routes/address";
import billRoute from "./routes/bill";
import commentRoute from "./routes/comment";
import conversationsRoute from "./routes/conversations";
import messagesRoute from "./routes/messages";

const io = new Server(8900, {
  cors: {},
});

let users: {
  userId: string;
  socketId: string;
}[] = [];

const addUser = (userId: string, socketId: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};

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

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user?.socketId || "").emit("getMessage", {
        senderId,
        text,
      });
    });

    socket.on("disconnect", () => {
      console.log("a user disconnect!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

  app.listen(process.env.PORT || env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT || env.PORT}`);
  });
};
