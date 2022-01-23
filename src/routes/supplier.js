const express = require("express");
const router = express.Router();

const supplier = require("../controllers/supplier.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/supplier');
const { validateCreate } = require("../validators/clientAndSupplier");

router.get("/", verifyToken, permissions.supplier, supplier.getSupplier);

router.get("/:id", verifyToken, permissions.supplier, supplier.getSupplierById);

router.post("/", verifyToken, permissions.create, validateCreate, supplier.createSupplier);

router.put("/:id", verifyToken, permissions.update, validateCreate, supplier.updateSupplier);

router.delete("/:id", verifyToken, permissions.Delete, supplier.deleteSupplier);

module.exports = router;
