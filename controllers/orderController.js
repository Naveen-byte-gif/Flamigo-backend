const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const {
      courierName,
      address,
      trackingId,
      amount,
      shippedUnshippedStatus,
      noQuery,
      orderId,
      orderDetails,
      receiverName,
      contact,
      color,
      gst,
    } = req.body;

    const image = req.file ? req.file.path : null;

    const order = new Order({
      courierName,
      address,
      trackingId,
      amount,
      shippedUnshippedStatus,
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

// Update order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { trackingId, courierName } = req.body;

    if (trackingId || courierName) {
      const updateFields = {};

      if (trackingId) {
        updateFields.trackingId = trackingId;
        updateFields.shippedUnshippedStatus = true; // Automatically mark as shipped when updating
      }
      if (courierName) updateFields.courierName = courierName;

      const order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
        new: true,
      });

      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Order updated successfully", order });
    } else {
      return res.status(400).json({
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
exports.getOrdersByStatus = async (req, res) => {
  try {
    const {status} = req.query; // Convert string to boolean
    const orders = await Order.find({ shippedUnshippedStatus: status });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getOrdersByContact = async (req, res) => {
  try {
    const {contact} = req.query;
    if (!contact) {
      return res.status(400).json({ success: false, message: "Contact is required" });
    }
    const orders = await Order.find({ contact });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
