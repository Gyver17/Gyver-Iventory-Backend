const express = require("express");
const router = express.Router();

const product_sell = require("../controllers/product_sell.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/sell')
const { validateCreate } = require("../validators/productSell")

router.get("/", verifyToken, permissions.products, product_sell.getProductSell);

router.get("/:id", verifyToken, permissions.products, product_sell.getProductSellById);

router.post("/", verifyToken, permissions.products, validateCreate, product_sell.createProductSell);

module.exports = router;
