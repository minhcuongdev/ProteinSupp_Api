import express from "express";
import verify from "../middlewares/verifyJWT";
import {
  createBill,
  getAllBill,
  updateStatusBill,
  getDetailBill,
} from "../controllers/bill";

const router = express.Router();

router.post("/", verify, createBill);
router.get("/", verify, getAllBill);
router.put("/:id", verify, updateStatusBill);
router.get("/:id", verify, getDetailBill);

export default router;
