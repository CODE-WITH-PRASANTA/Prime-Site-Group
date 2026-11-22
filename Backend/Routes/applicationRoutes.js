const express = require("express");
const {
  createApplication,
  getApplications,
  updateApplicationStatus,
  downloadResume,
  deleteApplication,
} = require("../Controller//applicationController");
const { uploadResume } = require("../Middleware/uploadResume");
// const { protect, adminOnly } = require("../Middleware/auth");  // <- your auth middleware

const router = express.Router();

// Public: the career page submits here
router.post("/", uploadResume, createApplication);

// Admin only: add your auth middleware before going live, e.g.
// router.use(protect, adminOnly);  (place it ABOVE the routes below)
router.get("/", getApplications);
router.get("/:id/resume", downloadResume);
router.patch("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);

module.exports = router;