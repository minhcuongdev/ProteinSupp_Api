import Conversation from "../models/Conversation";
import { Request, Response } from "express";

export const createConversation = async (req: Request, res: Response) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json(error);
  }
};
