const express = require("express");
const router = express.Router();

const setting = require("../controllers/setting.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/setting')

router.get("/setting", [verifyToken, permissions.setting], setting.getSetting);

router.get("/setting/:id", [verifyToken, permissions.setting], setting.getSettingById);

router.post("/setting", [verifyToken, permissions.setting], setting.createSetting);

router.put("/setting/:id", [verifyToken, permissions.setting], setting.updateSetting);

router.delete("/setting/:id", [verifyToken, permissions.setting], setting.deleteSetting);

module.exports = router;
