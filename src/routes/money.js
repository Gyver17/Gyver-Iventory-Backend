const express = require("express");
const router = express.Router();

const money = require("../controllers/money.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/setting')
const { validateCreate } = require("../validators/money")

router.get("/", verifyToken, permissions.setting, money.getMoney);

router.get("/:id", verifyToken, permissions.setting, money.getMoneyById);

router.post("/", verifyToken, permissions.setting, validateCreate, money.createMoney);

router.put("/:id", verifyToken, permissions.setting, validateCreate, money.updateMoney);

router.delete("/:id", verifyToken, permissions.setting, money.deleteMoney);

module.exports = router;
