const mongoose = require("mongoose");

const STATUSES = ["Active", "Inactive"];

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
      trim: true,
      minlength: [2, "Category name must be at least 2 characters."],
      maxlength: [80, "Category name cannot exceed 80 characters."],
    },
    slug: {
      type: String,
      required: [true, "Category slug is required."],
      trim: true,
      lowercase: true,
      minlength: [2, "Slug must be at least 2 characters."],
      maxlength: [100, "Slug cannot exceed 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters."],
    },
    status: {
      type: String,
      enum: {
        values: STATUSES,
        message: "Status must be either 'Active' or 'Inactive'.",
      },
      default: "Active",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
blogCategorySchema.index({ name: 1 }, { unique: true });
blogCategorySchema.index({ slug: 1 }, { unique: true });
blogCategorySchema.index({ status: 1 });
blogCategorySchema.index({ createdAt: -1 });

/* Shape JSON response */
blogCategorySchema.set("toJSON", {
  virtuals: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    ret.createdAtFormatted = new Date(ret.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    ret.timeFormatted = new Date(ret.createdAt)
      .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
      .toUpperCase();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("BlogCategory", blogCategorySchema);
module.exports.STATUSES = STATUSES;
