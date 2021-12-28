const express = require("express");
const router = express.Router();
const verify = require("../lib/verifyToken");
const permissions = require("../lib/verifyRol");

const users = require("../controllers/users.controllers");

router.get("/users", [verify.verifyToken, permissions.rol], users.getUsers);

router.get(
  "/users/:id",
  [verify.verifyToken, permissions.rol],
  users.getUsersById
);

router.post("/users", [verify.verifyToken, permissions.rol], users.createUsers);

router.put(
  "/users/:id",
  [verify.verifyToken, permissions.rol],
  users.updateUsers
);

router.delete(
  "/users/:id",
  [verify.verifyToken, permissions.rol],
  users.deleteUsers
);

router.get(
  "/users/permissions/:id",
  [verify.verifyToken, permissions.rol],
  users.InnerUsers
);

module.exports = router;
