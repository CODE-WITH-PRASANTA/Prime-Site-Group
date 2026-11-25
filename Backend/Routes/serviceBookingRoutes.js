const express = require("express");
const {
  createServiceBooking,
  getServiceBookings,
  getServiceBookingById,
  updateServiceBooking,
  updateServiceBookingStatus,
  deleteServiceBooking,
} = require("../Controller/serviceBookingController");

const router = express.Router();

// Public: submit service booking modal
router.post("/", createServiceBooking);

// Admin: manage service bookings
router.get("/", getServiceBookings);
router.get("/:id", getServiceBookingById);
router.put("/:id", updateServiceBooking);
router.patch("/:id", updateServiceBooking);
router.patch("/:id/status", updateServiceBookingStatus);
router.delete("/:id", deleteServiceBooking);

module.exports = router;
