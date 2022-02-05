const express = require("express");

/**
 * router
 */
const router = express.Router();

/**
 * Routes
 */
router.use("/search", require("../../handlers/SearchHandler"));

module.exports = router;
