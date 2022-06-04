import mongoose from "mongoose";

const { Schema } = mongoose;

const BillSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  orderUser: {
    type: String,
    required: true,
  },
  phoneOrderUser: {
    type: String,
    default: "",
  },
  receivedUser: {
    type: String,
    required: true,
  },
  phoneReceivedUser: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Preparing"
  },
  products:{
    type: Array,
    default: []
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  cancel: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: String,
    default: "cash"
  }
},{timestamps: true});

const Bill = mongoose.model('Bill', BillSchema);

export default Bill