const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");

// GET ALL
router.get("/api/order", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ONE
router.get("/api/order/:orderId", (req, res) => {
  Order.findById(req.params.orderId)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
});

// CREATE
router.post("/api/neworder", (req, res) => {
  

  const order = new Order({
    userId: req.body.userId,
    productId: req.body.productId,
    freightId: req.body.freightId,
    paymentMethod: req.body.paymentMethod,
    activeOrder: req.body.activeOrder,
  });

  order.save((err, order) => {
    if (err) res.status(400).json(err);
    else res.status(201).json(order);
  });
});

// DELETE
router.delete("/api/order/:orderId", async (req, res) => {
  try {
    const removedorder = await Order.deleteOne({
      _id: req.params.orderId,
    });
    res.status(200).json({ status: "removed order" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/api/order/:orderId", async (req, res) => {
  try {
    const updatedOrder = await Order.updateOne(
      { _id: req.params.orderId },
      {
        $set: {
          userId: req.body.userId,
          productId: req.body.productId,
          freightId: req.body.freightId,
          paymentMethod: req.body.paymentMethod,
          activeOrder: req.body.activeOrder
        },
      }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;