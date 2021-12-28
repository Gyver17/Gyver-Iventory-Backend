const express = require("express");
const router = express.Router();

const money = require("../controllers/money.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/setting')

router.get("/money", [verifyToken, permissions.setting], money.getMoney);

router.get("/money/:id", [verifyToken, permissions.setting], money.getMoneyById);

router.post("/money", [verifyToken, permissions.setting], money.createMoney);

router.put("/money/:id", [verifyToken, permissions.setting], money.updateMoney);

router.delete("/money/:id", [verifyToken, permissions.setting], money.deleteMoney);

module.exports = router;
