import Comment from "../models/Comment";
import { Request, Response } from "express";

export const createComment = async (req: Request, res: Response) => {
  try {
    const newComment = new Comment(req.body);

    const saveComment = await newComment.save();

    res.status(201).json(saveComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 0;
    const productId = req.query.productId;

    const comments = await Comment.find(
      { productIds: { $in: [productId] } },
      null,
      { limit: limit }
    );

    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};
