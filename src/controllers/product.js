import Product from "../models/Product";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await Product.findByIdAndDelete(productId);

    if(deleteProduct) return  res.status(200).json("Delete product successfully");

    return res.status(404).json("Product not exist")

  } catch (error) {
    res.status(500).json(error)
  }
}

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    const saveProduct = await newProduct.save();

    res.status(201).json(saveProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) return res.status(404).json("Product not exist");

    try {
      const updateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $set: req.body
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
