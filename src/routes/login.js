const express = require("express");
const router = express.Router();

const login = require("../controllers/login.controllers")
const auth = require("../lib/auth");
const { validateCreate } = require("../validators/login");

router.post("/login", validateCreate, login.loginUsers);

router.get('/logout', auth.isLoggedIn, login.logoutUsers)


module.exports = router;