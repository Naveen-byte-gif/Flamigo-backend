import express from "express";
import upload from "../utils/multerFun.js"; // Add .js extension

import * as orderController from "../controllers/orderController.js"; // Add .js extension

const Router = express.Router();

Router.post("/",  orderController.createOrder);
Router.get("/", orderController.getAllOrders);
// router.get("/:id", getOrderById);
Router.put("/:id", orderController.updateOrder);
Router.put("/uploadImage/:id", orderController.uploadImage);
Router.delete("/:id", orderController.deleteOrder);
Router.get("/shippingStatus", orderController.getOrdersByStatus);
Router.get("/contact", orderController.getOrdersByContact);

export default Router;
