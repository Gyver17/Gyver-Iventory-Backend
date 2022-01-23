const express = require("express");
const router = express.Router();

const product_buy = require("../controllers/product_buy.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/buy')
const { validateCreate } = require('../validators/productBuy')

router.get("/", verifyToken, permissions.products, product_buy.getProductBuy);

router.get("/:id", verifyToken, permissions.products, product_buy.getProductBuyById);

router.post("/", verifyToken, permissions.products, validateCreate, product_buy.createProductBuy);

module.exports = router;
