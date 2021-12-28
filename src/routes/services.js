const express = require("express");
const router = express.Router();

const services = require("../controllers/services.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/services')

router.get("/services", [verifyToken, permissions.services], services.getServices);

router.get("/services/:id", [verifyToken, permissions.services], services.getServicesById);

router.post("/services", [verifyToken, permissions.create], services.createServices);

router.put("/services/:id", [verifyToken, permissions.update], services.updateServices);

router.delete("/services/:id", [verifyToken, permissions.Delete], services.deleteServices);

module.exports = router;
