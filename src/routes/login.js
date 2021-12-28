const express = require("express");
const router = express.Router();

const login = require("../controllers/login.controllers")
const auth = require("../lib/auth")

router.post("/login", auth.isNotLoggedIn, login.loginUsers);

router.get('/logout', auth.isLoggedIn, login.logoutUsers)

module.exports = router;