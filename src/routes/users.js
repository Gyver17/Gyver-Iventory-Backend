const express = require("express");
const router = express.Router();

const { verifyToken } = require("../lib/verifyToken");
const permissions = require("../lib/verifyRol");
const users = require("../controllers/users.controllers");
const { validateCreate } = require("../validators/users")

router.get("/", verifyToken, permissions.rol, users.getUsers);

router.get("/:id", verifyToken, permissions.rol, users.getUsersById
);

router.post("/", verifyToken, permissions.rol, validateCreate, users.createUsers);

router.put("/:id", verifyToken, permissions.rol, validateCreate, users.updateUsers
);

router.delete("/:id", verifyToken, permissions.rol, users.deleteUsers
);

module.exports = router;
