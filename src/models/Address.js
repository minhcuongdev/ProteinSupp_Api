import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      require: true,
    },
    nameReceivedUser: {
      type: String,
      require: true,
    },
    numberPhone: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);

export default Address;
