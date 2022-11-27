import Cart from "../models/Cart";
import Product from "../models/Product";
import { Request, Response } from "express";

export const updateQualityProduct = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.id;

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedCart) return res.status(404).json("Not found product");

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllCart = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const productsCart = await Cart.find({ userId: user._id });

    res.status(200).json(productsCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const product = await Product.findById(req.body.productId);

    if (!product) return res.status(404).json("Not found product");

    const newCart = new Cart({
      userId: user._id,
      productId: req.body.productId,
      quality: req.body.quality,
      imageProduct: product.imageProducts?.[0] || "",
      nameProduct: product.name,
      priceProduct: product.price,
    });

    const saveCart = await newCart.save();

    res.status(201).json(saveCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.id;

    const removeCart = await Cart.findByIdAndDelete(cartId);

    if (!removeCart)
      return res.status(404).json("Not found product that you want to delete");

    res.status(200).json("Delete successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
