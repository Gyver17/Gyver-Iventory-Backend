const express = require("express");
const router = express.Router();

const product_sell = require("../controllers/product_sell.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/sell')

router.get("/product_sell", [verifyToken, permissions.products], product_sell.getProductSell);

router.get("/product_sell/:id", [verifyToken, permissions.products], product_sell.getProductSellById);

router.post("/product_sell", [verifyToken, permissions.products], product_sell.createProductSell);

router.get(
  "/inner/product_sell/:id_invoice",
  verifyToken,
  product_sell.innerProductSell
);

module.exports = router;
