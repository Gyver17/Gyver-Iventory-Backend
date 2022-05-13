const express = require("express");
const router = express.Router();

const invoice_buy = require("../controllers/invoice_buy.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require("../permissions/buy");
const {
  validateCreate,
  validateCreateReturn,
  validateUpdate,
} = require("../validators/invoiceBuy");

router.get(
  "/date/:date",
  verifyToken,
  permissions.invoice,
  invoice_buy.getInvoiceBuy
);

router.get(
  "/pay/:date",
  verifyToken,
  permissions.invoice,
  invoice_buy.getPayInvoiceBuy
);

router.get(
  "/byId/:id",
  verifyToken,
  permissions.invoice,
  invoice_buy.getInvoiceBuyById
);

router.post(
  "/buy",
  verifyToken,
  permissions.create,
  validateCreate,
  invoice_buy.createInvoiceBuy
);

router.post(
  "/return",
  verifyToken,
  permissions.create,
  validateCreateReturn,
  invoice_buy.createInvoiceBuyReturn
);

router.put(
  "/:id",
  verifyToken,
  permissions.update,
  validateUpdate,
  invoice_buy.updateInvoiceBuyPay
);

module.exports = router;
