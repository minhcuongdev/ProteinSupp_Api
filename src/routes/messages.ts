import express from "express";
import { addMessage, getMessages } from "../controllers/messages";
import verify from "../middlewares/verifyJWT";

const router = express.Router();

router.post("/", verify, addMessage);
router.get("/:conversationId", verify, getMessages);

export default router;
