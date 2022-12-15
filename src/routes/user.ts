import express from "express";
import verify from "../middlewares/verifyJWT";
import { getAllUser, updateInfoUser, getInfoUser } from "../controllers/user";

const router = express.Router();

router.get("/", verify, getAllUser);
router.get("/:id", verify, getInfoUser);
router.put("/:id", verify, updateInfoUser);

export default router;
