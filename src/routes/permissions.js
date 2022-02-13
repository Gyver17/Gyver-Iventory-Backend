const express = require("express");
const router = express.Router();

const permissions = require("../controllers/permissions.controllers");
const { verifyToken } = require("../lib/verifyToken");
const { verifyRol } = require("../lib/verifyRol")
const { validateCreate } = require("../validators/permissions")

router.get("/", verifyToken, verifyRol, permissions.getPermissions);

router.get("/:id", verifyToken, verifyRol, permissions.getPermissionsById);

router.post("/", verifyToken, verifyRol, validateCreate,  permissions.createPermissions);

router.put("/:id", verifyToken, verifyRol, validateCreate, permissions.updatePermissions);

router.delete("/:id", verifyToken, verifyRol, permissions.deletePermissions);

module.exports = router;
