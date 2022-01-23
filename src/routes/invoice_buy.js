const express = require("express");
const router = express.Router();

const invoice_buy = require("../controllers/invoice_buy.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/buy');
const { validateCreate } = require("../validators/invoiceBuy");

router.get("/", verifyToken, permissions.invoice, invoice_buy.getInvoiceBuy);

router.get("/:id", verifyToken, permissions.invoice, invoice_buy.getInvoiceBuyById);

router.post("/", verifyToken, permissions.create, validateCreate, invoice_buy.createInvoiceBuy);

router.put("/:id", verifyToken, permissions.update, validateCreate, invoice_buy.updateInvoiceBuy);

module.exports = router;
