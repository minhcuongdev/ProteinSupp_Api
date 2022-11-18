import CryptoJS from "crypto-js";
import { Response } from "express";
import IToken from "interfaces/IToken";
import IUser from "interfaces/IUser";
import TypedRequest from "interfaces/TypedRequest";
import jwt from "jsonwebtoken";
import { env } from "../configs/environments";
import RefreshToken from "../models/RefreshToken";
import User from "../models/User";

export const register = async (
  req: TypedRequest<{}, IUser, {}>,
  res: Response
) => {
  try {
    const userExistByEmail = await User.findOne({ email: req.body.email });
    if (userExistByEmail)
      return res.status(401).json(`${req.body.email} has been register`);

    const userExistByPhone = await User.findOne({ phoneNo: req.body.phoneNo });
    if (userExistByPhone)
      return res.status(401).json(`${req.body.email} has been register`);

    const hashPassword = CryptoJS.AES.encrypt(
      req.body.password,
      env.SECRET_KEY || ""
    ).toString();

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      phoneNo: req.body.phoneNo,
    });

    const user = await newUser.save();

    const { password, ...info } = user._doc;

    res.status(201).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (
  req: TypedRequest<{ admin: string }, IUser, {}>,
  res: Response
) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { phoneNo: req.body.phoneNo }],
    });

    if (!user)
      return res.status(404).json("Incorrect email/phone or password !");

    const admin = req.query.admin;
    if (admin) {
      if (user.role !== "producer")
        return res.status(401).json("Not authorization");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, env.SECRET_KEY || "");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password)
      return res.status(403).json("Incorrect email or password !");

    const { password, ...info } = user._doc;

    const accessToken = jwt.sign(info, env.SECRET_JWT_TOKEN || "", {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(info, env.SECRET_REFRESH_JWT_TOKEN || "");

    const savedRefreshToken = new RefreshToken({ refreshToken });
    await savedRefreshToken.save();

    return res.status(200).json({ ...info, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const loginSocialNetwork = async (
  req: TypedRequest<{}, IUser, {}>,
  res: Response
) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { phoneNo: req.body.phoneNo }],
    })
      .where("role")
      .equals("customer");

    if (user)
      return res.status(401).json("email or phone has been exist in system");

    const userSocialNetwork = await User.findOne({ email: req.body.email })
      .where("role")
      .equals("customerSocialNetwork");

    if (!userSocialNetwork) {
      const newUserSocialNetwork = new User({
        username: req.body.username,
        email: req.body.email,
        password: "null",
        phoneNo: req.body.phoneNo,
        profilePicture: req.body.profilePicture,
        role: "customerSocialNetwork",
      });

      const user = await newUserSocialNetwork.save();

      const { password, ...info } = user._doc;

      const accessToken = jwt.sign(info, env.SECRET_JWT_TOKEN || "", {
        expiresIn: "7d",
      });
      const refreshToken = jwt.sign(info, env.SECRET_REFRESH_JWT_TOKEN || "");

      const savedRefreshToken = new RefreshToken({ refreshToken });
      await savedRefreshToken.save();

      return res.status(200).json({ ...info, accessToken, refreshToken });
    }

    const { password, ...info } = userSocialNetwork._doc;

    const accessToken = jwt.sign(info, env.SECRET_JWT_TOKEN || "", {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(info, env.SECRET_REFRESH_JWT_TOKEN || "");

    const savedRefreshToken = new RefreshToken({ refreshToken });
    await savedRefreshToken.save();

    return res.status(200).json({ ...info, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = async (
  req: TypedRequest<{}, IToken, {}>,
  res: Response
) => {
  const refreshToken = req.body.refreshToken;

  try {
    const verifyRefreshToken = await RefreshToken.findOne({ refreshToken });

    if (verifyRefreshToken) {
      await RefreshToken.findByIdAndDelete(verifyRefreshToken.id);
      res.status(200).json("logout");
    } else {
      res.status(403).json("Refresh Token is not valid!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const refreshToken = async (
  req: TypedRequest<{}, IToken, {}>,
  res: Response
) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.status(401).json("You are not authenticated!");

  try {
    const verifyRefreshToken = await RefreshToken.findOne({
      refreshToken: refreshToken,
    });

    if (verifyRefreshToken) {
      jwt.verify(
        refreshToken,
        env.SECRET_REFRESH_JWT_TOKEN || "",
        async (err: any, data: any) => {
          if (err) return res.status(403).json("Refresh Token is not valid!");

          const { iat, ...info } = data;

          const newAccessToken = jwt.sign(info, env.SECRET_JWT_TOKEN || "", {
            expiresIn: "7d",
          });
          const newRefreshToken = jwt.sign(
            info,
            env.SECRET_REFRESH_JWT_TOKEN || ""
          );

          try {
            await RefreshToken.findByIdAndDelete(verifyRefreshToken.id);

            const savedRefreshToken = new RefreshToken({
              refreshToken: newRefreshToken,
            });
            await savedRefreshToken.save();

            res.status(200).json({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            });
          } catch (error) {
            res.status(500).json(error);
          }
        }
      );
    } else {
      res.status(403).json("Refresh Token is not valid!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
