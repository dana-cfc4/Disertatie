const Order = require("../models/order");

getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    !orders.length
      ? res.status(402).json({
          success: false,
          error: "There are no orders to display",
        })
      : res.status(200).json({ success: true, data: orders });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Cannot display orders",
    });
  }
};

addOrder = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const order = new Order(body);
      await order.save();
      return res.status(201).json({
        success: true,
        id: order._id,
        addedOrder: order,
        message: "Order created!",
      });
    } else {
      throw new Error("You must introduce order information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Order could not be created!",
    });
  }
};

module.exports = {
  getOrders,
  addOrder,
};
