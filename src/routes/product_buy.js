const express = require("express");
const router = express.Router();

const product_buy = require("../controllers/product_buy.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/buy')

router.get("/product_buy", [verifyToken, permissions.products], product_buy.getProductBuy);

router.get("/product_buy/:id", [verifyToken, permissions.products], product_buy.getProductBuyById);

router.post("/product_buy", [verifyToken, permissions.products], product_buy.createProductBuy);

router.get(
  "/inner/product_buy/:id_invoice",
  verifyToken,
  product_buy.innerProductBuy
);

module.exports = router;
