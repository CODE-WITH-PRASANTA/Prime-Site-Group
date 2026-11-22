const mongoose = require("mongoose");

const STATUSES = ["New", "Reviewed", "Shortlisted", "Rejected"];

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name."],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters."],
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Please enter your email address."],
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number."],
      trim: true,
      validate: {
        validator: (v) => {
          const digits = String(v).replace(/\D/g, "");
          return digits.length >= 10 && digits.length <= 15;
        },
        message: "Enter a valid phone number.",
      },
    },
    position: {
      type: String,
      required: [true, "Please select a position."],
      trim: true,
      maxlength: 150,
    },
    career: { type: mongoose.Schema.Types.ObjectId, ref: "Career", default: null },
    resume: {
      originalName: { type: String, required: true },
      fileName: { type: String, required: true },
      mimeType: { type: String },
      size: { type: Number },
    },
    status: { type: String, enum: STATUSES, default: "New" },
  },
  { timestamps: true }
);

applicationSchema.index({ createdAt: -1 });
applicationSchema.index({ email: 1, position: 1 });

applicationSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    if (ret.resume) delete ret.resume.fileName; // never expose the server file name
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Application", applicationSchema);