const express = require("express");
const router = express.Router();

const client = require("../controllers/client.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/client')

router.get("/client", [verifyToken, permissions.client], client.getClient);

router.get("/client/:id", [verifyToken, permissions.client], client.getClientById);

router.post("/client", [verifyToken, permissions.create], client.createClient);

router.put("/client/:id", [verifyToken, permissions.update], client.updateClient);

router.delete("/client/:id", [verifyToken, permissions.Delete], client.deleteClient);

module.exports = router;
