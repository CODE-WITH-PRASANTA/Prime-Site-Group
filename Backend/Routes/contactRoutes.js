const express = require("express");
const {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  updateContact,
  deleteContact,
} = require("../Controller/contactController");

const router = express.Router();

// Public: contact form submits here
router.post("/", createContact);

// Admin: enquiry list, detail, updates, status toggle and delete
router.get("/", getContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.patch("/:id", updateContact);
router.patch("/:id/status", updateContactStatus);
router.delete("/:id", deleteContact);

module.exports = router;