const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

const adminController = require("./admin.controller");

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/stats", adminController.getStats);

router.get("/tasks", adminController.getAllTasks);

router.delete("/tasks/:id", adminController.deleteTask);

module.exports = router;