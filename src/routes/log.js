const express = require("express");
const router = express.Router();

const log = require("../controllers/log.controllers")
const { verifyToken } = require("../lib/verifyToken");
const { validateCreate } = require("../validators/login");

router.post("/", validateCreate, log.loginUsers);

router.put("/", verifyToken, log.logoutUsers)

module.exports = router;