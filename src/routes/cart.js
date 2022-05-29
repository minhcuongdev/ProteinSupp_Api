import express from "express";
import verify from "../middlewares/verifyJWT"
import { createCart, deleteCart, getAllCart, updateQualityProduct } from "../controllers/cart";

const router = express.Router()

router.post("/",verify,createCart)
router.delete("/:id", verify, deleteCart)
router.get("/",verify,getAllCart)
router.put("/:id",verify,updateQualityProduct)

export default router;