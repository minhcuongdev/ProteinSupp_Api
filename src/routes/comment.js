import express from "express";
import verify from "../middlewares/verifyJWT"
import { createComment, getComment } from "../controllers/comment";

const router = express.Router();

router.post("/", verify, createComment)
router.get("/", getComment)

export default router