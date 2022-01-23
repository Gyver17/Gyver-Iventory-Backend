const express = require("express");
const router = express.Router();

const invoice_sell = require("../controllers/invoice_sell.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/sell')
const { validateCreate } = require("../validators/invoiceSell")

router.get("/", verifyToken, permissions.invoice, invoice_sell.getInvoiceSell);

router.get("/:id", verifyToken, permissions.invoice, invoice_sell.getInvoiceSellById);

router.post("/", verifyToken, permissions.create, validateCreate, invoice_sell.createInvoiceSell);

router.put("/:id", verifyToken, permissions.update, validateCreate, invoice_sell.updateInvoiceSell);

module.exports = router;
