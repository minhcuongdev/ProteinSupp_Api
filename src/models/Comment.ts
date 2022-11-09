import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  productIds: {
    type: Array,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: ""
  },
  comment: {
    type: String,
    required: true
  },
  point: {
    type: Number,
    default: 1
  }
},{timestamps: true})

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment