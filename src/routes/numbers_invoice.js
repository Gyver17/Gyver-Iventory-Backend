const express = require("express");
const router = express.Router();

const { verifyToken } = require("../lib/verifyToken");
const numbers = require("../controllers/numbers_invoice.controllers");
const { validateCreate } = require("../validators/numbersInvoice");

router.get('/', verifyToken, numbers.getNumbersInvoice);

router.put('/', verifyToken, validateCreate, numbers.updateNumbersInvoice);

module.exports = router;