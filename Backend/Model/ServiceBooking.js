const mongoose = require("mongoose");

const STATUSES = ["New", "In Progress", "Resolved"];

const serviceBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters."],
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      validate: {
        validator: (v) => {
          const digits = String(v || "").replace(/\D/g, "");
          return digits.length >= 7 && digits.length <= 15;
        },
        message: "Please enter a valid phone number.",
      },
    },
    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: 150,
    },
    service: {
      type: String,
      required: [true, "Service is required."],
      trim: true,
      maxlength: 120,
    },
    enquiry: {
      type: String,
      trim: true,
      default: "General Enquiry",
      maxlength: 100,
    },
    status: {
      type: String,
      enum: STATUSES,
      default: "New",
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [5, "Message must contain at least 5 characters."],
      maxlength: [3000, "Message must be under 3000 characters."],
    },
  },
  { timestamps: true }
);

serviceBookingSchema.index({ createdAt: -1 });
serviceBookingSchema.index({ status: 1, createdAt: -1 });
serviceBookingSchema.index({ service: 1, createdAt: -1 });

serviceBookingSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

serviceBookingSchema.statics.STATUSES = STATUSES;

module.exports = mongoose.model("ServiceBooking", serviceBookingSchema);
