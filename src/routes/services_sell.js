const express = require("express");
const router = express.Router();

const services_sell = require("../controllers/services_sell.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/sell')
const { validateCreate } = require("../validators/servicesSell")

router.get("/", verifyToken, permissions.products, services_sell.getServicesSell);

router.get(
  "/:id",
  verifyToken,
  permissions.products,
  services_sell.getServicesSellById
);

router.post("/", verifyToken, permissions.products, validateCreate, services_sell.createServicesSell);

module.exports = router;
