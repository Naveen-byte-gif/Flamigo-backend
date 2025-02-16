// Update order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { trackingId, courierName } = req.body;

    if (trackingId || courierName) {
      const updateFields = {};

      // Check if trackingId is provided, and update accordingly
      if (trackingId) {
        updateFields.trackingId = trackingId;
        updateFields.shippedUnshippedStatus = true; // Automatically mark as shipped when updating trackingId
      } else {
        updateFields.shippedUnshippedStatus = false; // Set status as unshipped if trackingId is removed or empty
      }

      if (courierName) updateFields.courierName = courierName;

      // Perform the update operation
      const order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
        new: true,
      });

      if (!order) return res.status(404).json({ message: "Order not found" });

      // If update is successful, return the updated order with status
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

// Fetch Shipped Orders
exports.getShippedOrders = async (req, res) => {
  try {
    const shippedOrders = await Order.find({ shippedUnshippedStatus: true });

    if (!shippedOrders || shippedOrders.length === 0) {
      return res.status(404).json({ message: "No shipped orders found" });
    }

    res.status(200).json({
      message: "Shipped orders fetched successfully",
      orders: shippedOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Unshipped Orders
exports.getUnshippedOrders = async (req, res) => {
  try {
    const unshippedOrders = await Order.find({ shippedUnshippedStatus: false });

    if (!unshippedOrders || unshippedOrders.length === 0) {
      return res.status(404).json({ message: "No unshipped orders found" });
    }

    res.status(200).json({
      message: "Unshipped orders fetched successfully",
      orders: unshippedOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
