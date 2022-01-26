const express = require("express");
const router = express.Router();

const setting = require("../controllers/setting.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/setting')
const { validateCreate } = require("../validators/setting")

router.get("/", verifyToken, permissions.setting, setting.getSetting);

router.post("/", verifyToken, permissions.setting, validateCreate, setting.createSetting);

router.put("/:id", verifyToken, permissions.setting, validateCreate, setting.updateSetting);

module.exports = router;
