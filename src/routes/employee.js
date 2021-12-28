const express = require("express");
const router = express.Router();

const employee = require("../controllers/employee.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/employee')

router.get("/employee", [verifyToken, permissions.employee], employee.getEmploye);

router.get("/employee/:id", [verifyToken, permissions.employee], employee.getEmployeById);

router.post("/employee", [verifyToken, permissions.create], employee.createEmploye);

router.put("/employee/:id", [verifyToken, permissions.update], employee.updateEmploye);

router.delete("/employee/:id", [verifyToken, permissions.Delete], employee.deleteEmploye);

module.exports = router;
