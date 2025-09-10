const express = require("express");
const router = express.Router();
const { getLast, getRange } = require("../controllers/waterLevelController");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Protected route example
router.get("/last/:deviceUuid", authenticateJWT, getLast);

// Admin-only route example
router.get(
  "/range/:deviceUuid",
  authenticateJWT,
  authorizeRoles("client"),
  getRange
);

module.exports = router;
