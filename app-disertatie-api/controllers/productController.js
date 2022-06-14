const Product = require("../models/product");

getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    !products.length
      ? res.status(402).json({
          success: false,
          error: "There are no products to display",
        })
      : res.status(200).json({ success: true, data: products });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Cannot display products",
    });
  }
};

addProduct = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const product = new Product(body);
      await product.save();
      return res.status(201).json({
        success: true,
        id: product._id,
        addedProduct: product,
        message: "Product created!",
      });
    } else {
      throw new Error("You must introduce product information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Product could not be created!",
    });
  }
};

updateProduct = async (req, res) => {
  try {
    const body = req.body;
    const product = await Product.findOne({ _id: req.params.id });
    if (body !== null) {
      Object.assign(product, body);
      await product.save();
      return res.status(200).json({
        success: true,
        id: product._id,
        editedProduct: product,
        message: "Product updated!",
      });
    } else {
      throw new Error("You must introduce product information");
    }
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Could not update product!",
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
};
