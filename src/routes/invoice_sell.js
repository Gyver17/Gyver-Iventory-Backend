const express = require("express");
const router = express.Router();

const invoice_sell = require("../controllers/invoice_sell.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/sell')

router.get("/invoice_sell", [verifyToken, permissions.invoice], invoice_sell.getInvoiceSell);

router.get("/invoice_sell/:id", [verifyToken, permissions.invoice], invoice_sell.getInvoiceSellById);

router.post("/invoice_sell", [verifyToken, permissions.create], invoice_sell.createInvoiceSell);

router.put("/invoice_sell/:id", [verifyToken, permissions.update], invoice_sell.updateInvoiceSell);

router.get(
  "/inner/invoice_sell/:id",
  verifyToken,
  invoice_sell.innerInvoiceSell
);

module.exports = router;
