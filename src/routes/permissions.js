const express = require("express");
const router = express.Router();

const permissions = require("../controllers/permissions.controllers");
const { verifyToken } = require("../lib/verifyToken");
const { rol } = require("../lib/verifyRol")
const { validateCreate } = require("../validators/permissions")

router.get("/", verifyToken, rol, permissions.getPermissions);

router.get("/:id", verifyToken, rol, permissions.getPermissionsById);

router.post("/", verifyToken, rol, validateCreate,  permissions.createPermissions);

router.put("/:id", verifyToken, rol, validateCreate, permissions.updatePermissions);

router.delete("/:id", verifyToken, rol, permissions.deletePermissions);

module.exports = router;
