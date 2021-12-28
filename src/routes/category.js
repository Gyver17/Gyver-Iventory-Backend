const { Router } = require("express");
const router = Router();
const category = require("../controllers/category.controllers");
const { verifyToken } = require("../lib/verifyToken");
const permissions = require('../permissions/category')

router.get("/category", [verifyToken, permissions.category], category.getCategory);

router.get("/category/:id", [verifyToken, permissions.category], category.getCategoryById);

router.post("/category", [verifyToken, permissions.create], category.createCategory);

router.put("/category/:id", [verifyToken, permissions.update], category.updateCategory);

router.delete("/category/:id", [verifyToken, permissions.Delete], category.deleteCategory);

module.exports = router;
