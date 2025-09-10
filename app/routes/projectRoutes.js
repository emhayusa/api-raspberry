const express = require("express");
const router = express.Router();
const { getListMyProject } = require("../controllers/projectController");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.get(
  "/list-my-project",
  authenticateJWT,
  authorizeRoles("client"),
  getListMyProject
);

module.exports = router;
