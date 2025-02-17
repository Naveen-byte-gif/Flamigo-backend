const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String },
    orderDetails: { type: String },
    receiverName: { type: String },
    address: { type: String },
    link: { type: String },
    contact: { type: String },
    color: { type: String },
    amount: { type: Number },
    courierName: { type: String },
    trackingId: { type: String },
    shippedUnshippedStatus: { type: Boolean, default: false },
    noQuery: { type: Boolean, default: false },
    image: { type: String },
    gst: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
