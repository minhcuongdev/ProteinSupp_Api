import express from "express";
import verify from "../middlewares/verifyJWT";
import { getAllUser, updateInfoUser } from "../controllers/user";


const router = express.Router();

router.get("/",verify, getAllUser)
router.put("/:id",verify, updateInfoUser)

export default router