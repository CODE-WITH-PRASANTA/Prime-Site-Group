const mongoose = require("mongoose");

const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Remote", "Internship"];
const STATUSES = ["Active", "Inactive", "Draft"];

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required."],
      trim: true,
      minlength: [3, "Title must be at least 3 characters."],
      maxlength: 150,
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
      maxlength: 100,
    },
    salary: {
      type: String,
      required: [true, "Salary range is required."],
      trim: true,
      maxlength: 60,
    },
    experience: { type: String, trim: true, default: "", maxlength: 60 },
    department: { type: String, trim: true, default: "", maxlength: 100 },
    type: {
      type: String,
      enum: { values: JOB_TYPES, message: "Invalid job type." },
      default: "Full Time",
    },
    status: {
      type: String,
      enum: { values: STATUSES, message: "Invalid status." },
      default: "Active",
    },
    vacancies: { type: Number, min: [1, "Vacancies must be at least 1."], default: 1 },
    description: {
      type: String,
      required: [true, "Job description is required."],
      trim: true,
      maxlength: 5000,
    },
  },
  { timestamps: true }
);

careerSchema.index({ title: "text", department: "text", location: "text" });
careerSchema.index({ createdAt: -1 });

/* Shape the JSON so it matches the frontend (id, posted, time) */
careerSchema.set("toJSON", {
  virtuals: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    ret.posted = new Date(ret.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    ret.time = new Date(ret.createdAt)
      .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
      .toUpperCase();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Career", careerSchema);
module.exports.JOB_TYPES = JOB_TYPES;
module.exports.STATUSES = STATUSES;