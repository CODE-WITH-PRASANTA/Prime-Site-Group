const express = require("express");
const {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require("../Controller//contactController");
// const { protect, adminOnly } = require("../Middleware/auth");  // <- your auth middleware

const router = express.Router();

// Public: the contact form submits here
router.post("/", createContact);

// Admin only: add your auth middleware before going live, e.g.
// router.use(protect, adminOnly);  (place it ABOVE the routes below)
router.get("/", getContacts);
router.get("/:id", getContactById);
router.patch("/:id/status", updateContactStatus);
router.delete("/:id", deleteContact);

module.exports = router;