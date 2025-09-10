const express = require("express");
const router = express.Router();
const { getLast, getRange } = require("../controllers/waveController");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Protected route example
router.get("/last/:deviceId", authenticateJWT, getLast);

// Admin-only route example
router.get(
  "/range/:deviceId",
  authenticateJWT,
  authorizeRoles("client"),
  getRange
);

module.exports = router;
