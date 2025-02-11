const express = require("express");
const upload = require("../middleware/upload");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// Use image upload middleware for POST request to /orders
router.post("/", upload.single("image"), createOrder); // 'image' is the form field name
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
