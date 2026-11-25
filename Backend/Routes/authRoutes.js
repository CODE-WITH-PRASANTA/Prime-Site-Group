const express = require("express");
const {
  loginAdmin,
  verifyAdmin,
  logoutAdmin,
} = require("../Controller/authController");
const { protectAdmin } = require("../Middleware/auth");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/me", protectAdmin, verifyAdmin);
router.post("/logout", logoutAdmin);

module.exports = router;
