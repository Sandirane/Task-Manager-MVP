const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../../middleware/auth.middleware"); 

const geminiController =
    require("./gemini.controller");

router.post(
    "/analyze",
    authMiddleware,
    geminiController.analyze
);

module.exports = router;