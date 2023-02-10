import {
  createConversation,
  getConversations,
} from "../controllers/conversations";
import verify from "../middlewares/verifyJWT";
import express from "express";

const router = express.Router();

router.post("/", verify, createConversation);
router.get("/:userId", verify, getConversations);

export default router;
