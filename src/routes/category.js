const { Router } = require("express");
const router = Router();
const category = require("../controllers/category.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/category');
const { validateCreate } = require("../validators/category");

router.get("/", verifyToken, permissions.category, category.getCategory);

router.get("/:id", verifyToken, permissions.category, category.getCategoryById);

router.post("/", verifyToken, permissions.create, validateCreate, category.createCategory);

router.put("/:id", verifyToken, permissions.update, validateCreate, category.updateCategory);

router.delete("/:id", verifyToken, permissions.Delete, category.deleteCategory);

module.exports = router;
