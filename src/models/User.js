import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required:  true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "customer"
    },
    birthday: {
      type: String,
      default:""
    },
    gender: {
      type: String,
      default: "",
    },
    phoneNo: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema)

export default User
