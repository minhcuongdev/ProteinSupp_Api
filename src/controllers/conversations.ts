import Conversation from "../models/Conversation";
import { Request, Response } from "express";
import User from "models/User";

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
    const user = req.user;

    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    const newConversations = await Promise.all(
      conversations.map(async (conversation: any) => {
        const newMembers: any = await Promise.all(
          conversation.members.map(async (memberId: any) => {
            const memberInfo: any = await User.findById(memberId);
            return {
              _id: memberId,
              username: memberInfo.username,
              avatar: memberInfo.profilePicture,
            };
          })
        );
        return {
          ...conversation._doc,
          members: newMembers,
        };
      })
    );

    res.status(200).json(newConversations);
  } catch (error) {
    res.status(500).json(error);
  }
};
