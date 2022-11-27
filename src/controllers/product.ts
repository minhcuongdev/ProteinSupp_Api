import Product from "../models/Product";
import { Request, Response } from "express";
import TypedRequest from "interfaces/TypedRequest";

export const getAllProduct = async (
  req: TypedRequest<{ skip: number; limit: number }, {}, {}>,
  res: Response
) => {
  try {
    const products = await Product.find()
      .sort({ date: -1 })
      .skip(req.query.skip || 0)
      .limit(req.query.limit || 0);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductById = async (
  req: TypedRequest<{}, {}, { id: string }>,
  res: Response
) => {
  try {
    const product = await Product.findById(req.params.id);
    const similarProducts = await Product.find({
      id: { $ne: product.id },
    }).limit(5);
    res.status(200).json({ ...product._doc, similarProducts: similarProducts });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await Product.findByIdAndDelete(productId);

    if (deleteProduct)
      return res.status(200).json("Delete product successfully");

    return res.status(404).json("Product not exist");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);

    const saveProduct = await newProduct.save();

    res.status(201).json(saveProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) return res.status(404).json("Product not exist");

    try {
      const updateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
