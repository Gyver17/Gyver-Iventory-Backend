const express = require("express");
const router = express.Router();

const services_sell = require("../controllers/services_sell.controllers");
const { verifyToken } = require("../lib/verifyToken");

router.get("/services_sell", verifyToken, services_sell.getServicesSell);

router.get(
  "/services_sell/:id",
  verifyToken,
  services_sell.getServicesSellById
);

router.post("/services_sell", verifyToken, services_sell.createServicesSell);

router.get(
  "/inner/services_sell/:id_invoice",
  verifyToken,
  services_sell.innerServicesSell
);

module.exports = router;
