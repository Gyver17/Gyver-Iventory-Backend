const express = require("express");
const router = express.Router();

const invoice_buy = require("../controllers/invoice_buy.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/buy')

router.get("/invoice_buy", [verifyToken, permissions.invoice], invoice_buy.getInvoiceBuy);

router.get("/invoice_buy/:id", [verifyToken, permissions.invoice], invoice_buy.getInvoiceBuyById);

router.post("/invoice_buy", [verifyToken, permissions.create], invoice_buy.createInvoiceBuy);

router.put("/invoice_buy/:id", [verifyToken, permissions.update], invoice_buy.updateInvoiceBuy);

router.get("/inner/invoice_buy/:id", verifyToken, invoice_buy.innerInvoiceBuy);

module.exports = router;
