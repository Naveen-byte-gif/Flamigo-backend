const Order = require("../models/Order");
const upload = require("../middleware/upload");

exports.createOrder = async (req, res) => {
  try {
    const {
      courierName,
      address,
      trackingId,
      amount,
      link,
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
      link,
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

exports.updateOrder = async (req, res) => {
  try {
    const { trackingId, courierName, link } = req.body;

    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (trackingId) {
      order.trackingId = trackingId;
      order.shippedUnshippedStatus = true;
    }

    if (courierName) {
      order.courierName = courierName;
    }

    if (link) {
      order.link = link;
    }

    await order.save();

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order by ID (including image and other fields)

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
    const { status } = req.query;
    const orders = await Order.find({ shippedUnshippedStatus: status });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getOrdersByContact = async (req, res) => {
  try {
    const { contact } = req.query;
    if (!contact) {
      return res
        .status(400)
        .json({ success: false, message: "Contact is required" });
    }
    const orders = await Order.find({ contact });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
