const mongoose = require("mongoose");

const STATUSES = ["New", "Read", "Replied"];

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
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
      trim: true,
      default: "",
      validate: {
        validator: (v) => {
          if (!v) return true; // optional field
          const digits = String(v).replace(/\D/g, "");
          return digits.length >= 10 && digits.length <= 15;
        },
        message: "Enter a valid phone number.",
      },
    },
    company: { type: String, trim: true, default: "", maxlength: 150 },
    service: { type: String, trim: true, default: "", maxlength: 100 },
    enquiry: { type: String, trim: true, default: "", maxlength: 100 },
    message: {
      type: String,
      required: [true, "Please enter your message."],
      trim: true,
      minlength: [5, "Message must contain at least 5 characters."],
      maxlength: [3000, "Message must be under 3000 characters."],
    },
    status: { type: String, enum: STATUSES, default: "New" },
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1, createdAt: -1 });

contactSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

contactSchema.statics.STATUSES = STATUSES;

module.exports = mongoose.model("Contact", contactSchema);