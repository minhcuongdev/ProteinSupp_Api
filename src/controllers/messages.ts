import Message from "../models/Message";
import { Request, Response } from "express";

export const addMessage = async (req: Request, res: Response) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
