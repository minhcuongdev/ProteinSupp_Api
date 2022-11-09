import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { env } from "../configs/environments";

const verify = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, env.SECRET_JWT_TOKEN || "", (err: any, data: any) => {
      if (err) return res.status(401).json("Token is not valid");
      req.user = data;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated !");
  }
};

export default verify;
