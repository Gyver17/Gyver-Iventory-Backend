const express = require("express");
const router = express.Router();

const client = require("../controllers/client.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/client');
const { validateCreate } = require('../validators/clientAndSupplier')

router.get("/", verifyToken, permissions.client, client.getClient);

router.get("/:id", verifyToken, permissions.client, client.getClientById);

router.post("/", verifyToken, permissions.create, validateCreate, client.createClient);

router.put("/:id", verifyToken, permissions.update, validateCreate, client.updateClient);

router.delete("/:id", verifyToken, permissions.Delete, client.deleteClient);

module.exports = router;
