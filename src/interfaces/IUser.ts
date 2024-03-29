import { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  role: string;
  birthday: string;
  gender: string;
  phoneNo: string;
  address: string;
  province: string;
  district: string;
  commune: string;
  _doc: any;
}

export default IUser;
