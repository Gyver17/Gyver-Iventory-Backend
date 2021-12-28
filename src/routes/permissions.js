const express = require("express");
const router = express.Router();

const permissions = require("../controllers/permissions.controllers");
const { verifyToken } = require("../lib/verifyToken");

router.get("/permissions", verifyToken, permissions.getPermissions);

router.get("/permissions/:id", verifyToken, permissions.getPermissionsById);

router.post("/permissions", verifyToken, permissions.createPermissions);

router.put("/permissions/:id", verifyToken, permissions.updatePermissions);

router.delete("/permissions/:id", verifyToken, permissions.deletePermissions);

module.exports = router;
