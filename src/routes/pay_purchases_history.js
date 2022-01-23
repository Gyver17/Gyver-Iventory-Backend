const express = require("express");
const router = express.Router();

const pay = require("../controllers/pay_purchases_history.controllers");
const { validateCreate } = require("../validators/payHistory");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/buy');

router.get('/', verifyToken, permissions.invoice, pay.getPayPurchasesHistory);

router.get('/:id', verifyToken, permissions.invoice, pay.getPayPurchasesHistoryById);

router.post('/', verifyToken, permissions.update, validateCreate, pay.createPayPurchasesHistory);

module.exports = router;