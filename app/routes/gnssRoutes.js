const express = require("express");
const router = express.Router();
const { getLast, getRange } = require("../controllers/gnssController");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Protected route example
router.get("/last/:deviceId", authenticateJWT, getLast);

router.get(
  "/range/:deviceId",
  authenticateJWT,
  authorizeRoles("client"),
  getRange
);

module.exports = router;
