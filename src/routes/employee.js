const express = require("express");
const router = express.Router();

const employee = require("../controllers/employee.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/employee');
const { validateCreate } = require("../validators/employee");

router.get("/", verifyToken, permissions.employee, employee.getEmploye);

router.get("/:id", verifyToken, permissions.employee, employee.getEmployeById);

router.post("/", verifyToken, permissions.create, validateCreate, employee.createEmploye);

router.put("/:id", verifyToken, permissions.update, validateCreate, employee.updateEmploye);

router.delete("/:id", verifyToken, permissions.Delete, employee.deleteEmploye);

module.exports = router;
