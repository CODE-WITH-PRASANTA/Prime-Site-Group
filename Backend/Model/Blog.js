const mongoose = require("mongoose");

const STATUSES = ["Published", "Draft", "Archived"];

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required."],
      trim: true,
      minlength: [3, "Title must be at least 3 characters."],
      maxlength: [200, "Title cannot exceed 200 characters."],
    },
    slug: {
      type: String,
      required: [true, "Blog slug is required."],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Short description cannot exceed 1000 characters."],
    },
    description: {
      type: String,
      required: [true, "Blog content/description is required."],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      trim: true,
      default: "Admin",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: {
        values: STATUSES,
        message: "Status must be Published, Draft, or Archived.",
      },
      default: "Published",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Search index
blogSchema.index({ title: "text", category: "text", author: "text", tags: "text" });
blogSchema.index({ createdAt: -1 });

blogSchema.set("toJSON", {
  virtuals: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();

    // Standard date representations
    const dateObj = new Date(ret.createdAt);
    ret.date = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    ret.formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    ret.time = dateObj
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();

    // If image is a local upload filename, attach image url helpers
    if (ret.image && !ret.image.startsWith("http") && !ret.image.startsWith("data:")) {
      ret.imageUrl = `/uploads/${ret.image}`;
    } else {
      ret.imageUrl = ret.image || "";
    }

    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
module.exports.STATUSES = STATUSES;
