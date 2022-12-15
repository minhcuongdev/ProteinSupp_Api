import User from "../models/User";
import CryptoJS from "crypto-js";
import { env } from "../configs/environments";
import { Request, Response } from "express";

export const getInfoUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = req.user;

    if (user._id === userId) {
      const userInfo = await User.findById(userId);

      const { password, ...info } = userInfo?._doc;

      res.status(200).json(info);
    } else {
      return res.status(403).json("Forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      const newUsers: any[] = [];

      users.map((user) => {
        const { password, ...info } = user._doc;
        newUsers.push(info);
      });

      return res.status(200).json(newUsers);
    }

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateInfoUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json("User not exist");

    const userAllowChange = await User.findOne({
      $or: [{ email: req.body.email }, { phoneNo: req.body.phoneNo }],
    });

    if (userAllowChange && userAllowChange._id.toString() !== userId) {
      return res.status(403).json("Email or Phone is exist in system");
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    if (oldPassword) {
      const bytes = CryptoJS.AES.decrypt(user.password, env.SECRET_KEY || "");
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== oldPassword)
        return res.status(401).json("Wrong password");

      const newPasswords = CryptoJS.AES.encrypt(
        newPassword,
        env.SECRET_KEY || ""
      ).toString();

      try {
        const updateUser: any = await User.findByIdAndUpdate(
          userId,
          {
            password: newPasswords,
          },
          { new: true }
        );

        const { password, ...info } = updateUser._doc;

        return res.status(200).json(info);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

    if (user.id === req.user._id) {
      try {
        const updateUser = await User.findByIdAndUpdate(
          userId,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json(updateUser);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      return res.status(401).json("You are not authentication");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
