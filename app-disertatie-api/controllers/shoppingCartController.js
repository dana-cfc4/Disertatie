const Cart = require("../models/shoppingCart");

getCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    !carts.length
      ? res.status(402).json({
        success: false,
        message: "There are no carts to display",
      })
      : res.status(200).json({ success: true, data: carts });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Could not display carts",
    });
  }
};

addCart = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const cart = new Cart(body);

      await cart.save();
      return res.status(201).json({
        success: true,
        id: cart._id,
        addedCart: cart,
        message: "Cart created!",
      });
    } else {
      throw new Error("You must provide cart information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Cart could not be created!",
    });
  }
};

updateCart = async (req, res) => {
  try {
    const body = req.body;
    const cart = await Cart.findOne({ _id: req.params.id });

    if (body !== null) {
      Object.assign(cart, body);
      await cart.save();
      return res.status(200).json({
        success: true,
        id: cart._id,
        editedCart: cart,
        message: "Cart updated!",
      });
    } else {
      throw new Error("You must provide cart information");
    }
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Cart update did not succeed!",
    });
  }
};

deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ success: true, data: cart });
  } catch (err) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Cart deletion did not succeed!",
    });
  }
};
module.exports = {
  getCarts,
  updateCart,
  addCart,
  deleteCart,
};
