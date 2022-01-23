const express = require("express");
const router = express.Router();

const log = require("../controllers/log.controllers")
const auth = require("../lib/auth");
const { validateCreate } = require("../validators/login");

router.post("/", validateCreate, log.loginUsers);

module.exports = router;