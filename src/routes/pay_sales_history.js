const express = require("express");
const router = express.Router();

const pay = require("../controllers/pay_sales_history.controllers");
const { validateCreate } = require("../validators/payHistory");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/sell');

router.get('/', verifyToken, permissions.invoice, pay.getPaySalesHistory);

router.get('/:id', verifyToken, permissions.invoice, pay.getPaySalesHistoryById);

router.post('/', verifyToken, permissions.update, validateCreate, pay.createPaySalesHistory);

module.exports = router;