import Bill from "../models/Bill";
import { Request, Response } from "express";

export const createBill = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const newBill = new Bill({ userId: user._id, ...req.body });

    const saveBill = await newBill.save();

    res.status(201).json(saveBill);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllBill = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const delivered = req.query.delivered;

    if (user.role === "producer") {
      const bills = await Bill.find();
      return res.status(200).json(bills);
    }

    if (delivered) {
      const bills = await Bill.find({ userId: user._id, status: "Delivered" });
      return res.status(200).json(bills);
    } else {
      const bills = await Bill.find({ userId: user._id, cancel: false });
      return res.status(200).json(bills);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateStatusBill = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const billId = req.params.id;
    const cancel = req.body.cancel;

    if (cancel) {
      const updateBill = await Bill.findByIdAndUpdate(
        billId,
        {
          $set: {
            cancel: cancel,
          },
        },
        { new: true }
      );

      if (!updateBill) return res.status(404).json("Bill are not exists");

      return res.status(200).json(updateBill);
    }

    if (user.role === "customer")
      return res.status(403).json("You are not allowed to update status bill");

    const updateBill = await Bill.findByIdAndUpdate(
      billId,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateBill) return res.status(404).json("Bill are not exists");

    res.status(200).json(updateBill);
  } catch (error) {
    res.status(500).json(error);
  }
};
