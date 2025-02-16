const express = require("express");
const upload = require("../middleware/upload");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByStatus,
  getOrdersByContact,
} = require("../controllers/orderController");

const router = express.Router();

// Use image upload middleware for POST request to /orders
router.post("/", upload.single("image"), createOrder); // 'image' is the form field name
router.get("/", getAllOrders);
// router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/shippingStatus", getOrdersByStatus);
router.get("/contact", getOrdersByContact);

module.exports = router;
