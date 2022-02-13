const express = require("express");
const router = express.Router();

const { verifyToken } = require("../lib/verifyToken");
const { verifyRol } = require("../lib/verifyRol");
const users = require("../controllers/users.controllers");
const { validateCreate } = require("../validators/users");
const { validateCreateUsersUpdate } = require("../validators/usersUpdate");

router.get("/", verifyToken, verifyRol, users.getUsers);

router.get("/:id", verifyToken, verifyRol, users.getUsersById
);

router.post("/", verifyToken, verifyRol, validateCreate, users.createUsers);

router.put("/updateUser/:id", verifyToken, verifyRol, validateCreateUsersUpdate, users.updateUsers
);

router.put("/updatePassword/:id", verifyToken, verifyRol, users.updatePassword
);

router.delete("/:id", verifyToken, verifyRol, users.deleteUsers
);

module.exports = router;
