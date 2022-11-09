import mongoose from "mongoose";

const { Schema } = mongoose

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: { 
    type: String, 
    required: true 
  },
  quality: {
    type: Number,
    default: 0
  },
  imageProduct: {
    type: String,
    default: "",
  },
  nameProduct: {
    type: String,
    default: "",
  },
  priceProduct: {
    type: Number,
    default: 0
  }
}, {timestamps: true})

const Cart = mongoose.model("Cart", CartSchema);

export default Cart