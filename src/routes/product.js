import express from "express";
import { 
  createProduct, 
  updateProduct, 
  getAllProduct
} from "../controllers/product";

const router = express.Router();

router.get("/", getAllProduct)
router.post("/", createProduct)
router.put("/:id", updateProduct)

export default router