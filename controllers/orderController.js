const Order = require("../models/Order");

// Create Order with Image Upload
// Create Order with Image Upload
exports.createOrder = async (req, res) => {
  try {
    const {
      name,
      courierName,
      address,
      trackingId,
      customerAmount,
      unshipped,
      noQuery,
      orderId,
      orderDetails,
      receiverName,
      contact,
      color,
      gst,
    } = req.body;

    // Check if image is provided
    const image = req.file ? req.file.path : null;

    // Create order
    const order = new Order({
      name,
      courierName,
      address,
      trackingId,
      customerAmount,
      unshipped,
      noQuery,
      image,
      orderId,
      orderDetails,
      receiverName,
      contact,
      color,
      gst,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Finds all orders in the database
    res.status(200).json(orders); // Sends the orders back as JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // Error handling
  }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { trackingId, courierName } = req.body; // Extract trackingId and courierName from the request body

    // Ensure trackingId and courierName are provided for update
    if (trackingId || courierName) {
      const updateFields = {};

      if (trackingId) updateFields.trackingId = trackingId;
      if (courierName) updateFields.courierName = courierName;

      const order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
        new: true,
      });

      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Order updated successfully", order });
    } else {
      return res
        .status(400)
        .json({
          message: "Tracking ID or Courier Name must be provided for update",
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
