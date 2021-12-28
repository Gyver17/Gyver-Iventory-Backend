const express = require("express");
const router = express.Router();

const products = require("../controllers/products.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/products')

router.get("/products", [verifyToken, permissions.product], products.getProducts);

router.get("/products/:id", [verifyToken, permissions.product], products.getProductsById);

router.post("/products", [verifyToken, permissions.create], products.createProducts);

router.put("/products/:id", [verifyToken, permissions.update], products.updateProducts);

router.delete("/products/:id", [verifyToken, permissions.Delete], products.deleteProducts);

router.get("/products_category", [verifyToken, permissions.product], products.innerProducts);

module.exports = router;
