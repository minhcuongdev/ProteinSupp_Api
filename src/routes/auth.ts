import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  loginSocialNetwork,
} from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/loginSocialNetwork", loginSocialNetwork);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

export default router;
