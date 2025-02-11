const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String },
    courierName: { type: String },
    address: { type: String },
    trackingId: { type: String, unique: true },
    customerAmount: { type: Number },
    unshipped: { type: Boolean, default: false },
    noQuery: { type: Boolean, default: false },
    image: { type: String },
    orderId: { type: String, unique: true },
    orderDetails: { type: String }, 
    receiverName: { type: String }, 
    contact: { type: String },
    color: { type: String }, 
    gst: { type: Boolean, default: false }, 
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
