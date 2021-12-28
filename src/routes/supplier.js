const express = require("express");
const router = express.Router();

const supplier = require("../controllers/supplier.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/supplier')

router.get("/supplier", [verifyToken, permissions.supplier], supplier.getSupplier);

router.get("/supplier/:id", [verifyToken, permissions.supplier], supplier.getSupplierById);

router.post("/supplier", [verifyToken, permissions.create], supplier.createSupplier);

router.put("/supplier/:id", [verifyToken, permissions.update], supplier.updateSupplier);

router.delete("/supplier/:id", [verifyToken, permissions.Delete], supplier.deleteSupplier);

module.exports = router;
