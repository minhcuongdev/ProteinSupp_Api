import express from "express";
import verify from "../middlewares/verifyJWT";
import {
  createAddress,
  getAllAddress,
  deleteAddress,
  updateAddress,
} from "../controllers/address";

const router = express.Router();

router.post("/", verify, createAddress);
router.get("/", verify, getAllAddress);
router.delete("/:id", verify, deleteAddress);
router.put("/:id", verify, updateAddress);

export default router;
