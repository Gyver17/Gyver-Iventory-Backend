const express = require("express");
const router = express.Router();

const { innerInvoiceSell } = require("../consult/innerInvoiceSell");
const { innerInvoiceBuy } = require("../consult/innerInvoiceBuy");
const { innerProductSell } = require("../consult/innerProductSell");
const { innerProductBuy } = require("../consult/innerProductBuy");
const { innerProducts } = require("../consult/innerProducts");
const { innerServicesSell } = require("../consult/innerServicesSell");
const { InnerUsers } = require("../consult/innerUsers");

const { verifyToken } = require("../lib/verifyToken");
const { invoice, product } = require("../permissions/consult");
const { setting } = require("../permissions/setting");

router.get("/invoice_sell", verifyToken, invoice, innerInvoiceSell);

router.get("/invoice_buy", verifyToken, invoice, innerInvoiceBuy);

router.get("/product_sell", verifyToken, product, innerProductSell);

router.get("/product_buy", verifyToken, product, innerProductBuy);

router.get("/products", verifyToken, innerProducts);

router.get("/services_sell", verifyToken, innerServicesSell);

router.get("/users", verifyToken, setting, InnerUsers);

module.exports = router;