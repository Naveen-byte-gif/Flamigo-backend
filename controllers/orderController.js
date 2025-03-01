import Order from "../models/orderModel.js"; // Ensure `.js` extension is included
import fs from 'fs';
import path from 'path';
import getUploadPath from "../utils/pathFun.js"; 
import multerWrapper from "../utils/multerFun.js"; 

export const createOrder = async (req, res) => {

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


export const updateOrder = async (req, res) => {
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

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const orders = await Order.find({ shippedUnshippedStatus: status });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const getOrdersByContact = async (req, res) => {
  try {
    const { contact } = req.query;

    if (!contact) {
      return res
        .status(400)
        .json({ success: false, message: "Contact is required" });
    }

    // Fetch orders where contact matches and gst is true
    const orders = await Order.find({ contact, gst: true });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const uploadImage = async (req, res, next) => {
  const upload = multerWrapper().array("image", 10);

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "File upload failed", error: err.message });
    }

    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ status: "error", message: "No order found with that ID" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ status: "error", message: "No files uploaded" });
      }

      // Ensure `order.image` is an array
      if (!Array.isArray(order.image)) {
        order.image = [];
      }

      // Save new files
      const newFilePaths = req.files.map((file) => {
        const { fullPath, relativePath } = getUploadPath(null, file.originalname, "orders");
        fs.writeFileSync(fullPath, file.buffer);
        return relativePath;
      });

      // Append new files to existing array
      order.image.push(...newFilePaths);
      await order.save();

      res.status(200).json({
        status: "success",
        data: { order },
        message: "Image updated successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
  });
};