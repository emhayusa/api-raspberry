const express = require("express");
const router = express.Router();
const { login, getProfile } = require("../controllers/authController");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.post("/signin", login);

// Protected route example
router.get("/profile", authenticateJWT, getProfile);

// Admin-only route example
router.get("/admin", authenticateJWT, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome admin!" });
});

module.exports = router;
