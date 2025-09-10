const express = require("express");
const router = express.Router();
const { getListMyDevice } = require("../controllers/deviceController");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Protected route example
router.get("/list-my-device", authenticateJWT, getListMyDevice);

module.exports = router;
