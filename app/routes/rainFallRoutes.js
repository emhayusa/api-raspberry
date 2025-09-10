const express = require("express");
const router = express.Router();
const { getLast, getRange } = require("../controllers/rainFallController");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Protected route example
//router.get("/last/:deviceId", authenticateJWT, getLast);
router.get("/last/:deviceUuid", getLast);

// Admin-only route example
// router.get(
//   "/range/:deviceUuid",
//   authenticateJWT,
//   authorizeRoles("client"),
//   getRange
// );

router.get("/range/:deviceUuid", getRange);

module.exports = router;
