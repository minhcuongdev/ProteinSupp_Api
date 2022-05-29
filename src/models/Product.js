import mongoose from "mongoose";

const {Schema} = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  imageProduct: {
    type: String,
    default: "",
  },
  typeProduct: {
    type: Array,
    default: []
  },
  productId: {
    type: String,
    default: ""
  },
  manufacturer: {
    type: String,
    default: ""
  },
  origin: {
    type: String,
    default: "",
  },
  manufacturerPrice: {
    type: Number,
    default: 0
  },
  promotional: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const Product = mongoose.model('Product', ProductSchema)

export default Product