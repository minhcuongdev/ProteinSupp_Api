import express from "express";
import { 
  createProduct, 
  updateProduct, 
  getAllProduct,
  deleteProduct
} from "../controllers/product";

const router = express.Router();

router.get("/", getAllProduct)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router