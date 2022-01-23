const express = require("express");
const router = express.Router();

const products = require("../controllers/products.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/products')
const { validateCreate } = require('../validators/products')

router.get("/", verifyToken, permissions.product, products.getProducts);

router.get("/:id", verifyToken, permissions.product, products.getProductsById);

router.post("/", verifyToken, permissions.create, validateCreate, products.createProducts);

router.put("/:id", verifyToken, permissions.update, validateCreate, products.updateProducts);

router.delete("/:id", verifyToken, permissions.Delete, products.deleteProducts);

module.exports = router;
