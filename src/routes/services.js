const express = require("express");
const router = express.Router();

const services = require("../controllers/services.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/services')
const { validateCreate } = require("../validators/services")

router.get("/", verifyToken, permissions.services, services.getServices);

router.get("/:id", verifyToken, permissions.services, services.getServicesById);

router.post("/", verifyToken, permissions.create, validateCreate, services.createServices);

router.put("/:id", verifyToken, permissions.update, validateCreate, services.updateServices);

router.delete("/:id", verifyToken, permissions.Delete, services.deleteServices);

module.exports = router;
