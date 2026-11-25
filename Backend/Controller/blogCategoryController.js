const mongoose = require("mongoose");
const BlogCategory = require("../Model/BlogCategory");

// Helper: Slugify string
const generateSlug = (str) => {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

/*
 * GET /api/blog-categories
 * Query params:
 *   search: string
 *   status: "Active" | "Inactive"
 *   page: number
 *   limit: number (pass 0 or all=true to fetch all without pagination)
 */
exports.getCategories = async (req, res, next) => {
  try {
    const { search = "", status = "", all = "" } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    if (search.trim()) {
      const rx = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ name: rx }, { slug: rx }, { description: rx }];
    }

    // If 'all' is requested, return everything (useful for dropdowns)
    if (all === "true" || req.query.limit === "0") {
      const categories = await BlogCategory.find(filter).sort({ order: 1, name: 1 });
      return res.json({
        success: true,
        data: categories,
        total: categories.length,
      });
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));

    const [total, categories, activeCount, inactiveCount] = await Promise.all([
      BlogCategory.countDocuments(filter),
      BlogCategory.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      BlogCategory.countDocuments({ status: "Active" }),
      BlogCategory.countDocuments({ status: "Inactive" }),
    ]);

    res.json({
      success: true,
      data: categories,
      counts: {
        total: activeCount + inactiveCount,
        active: activeCount,
        inactive: inactiveCount,
      },
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (err) {
    next(err);
  }
};

/*
 * GET /api/blog-categories/:id
 */
exports.getCategoryById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid category ID." });
    }

    const category = await BlogCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

/*
 * POST /api/blog-categories
 */
exports.createCategory = async (req, res, next) => {
  try {
    const { name, slug, description, status, order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required." });
    }

    const trimmedName = name.trim();
    const finalSlug = (slug && slug.trim()) ? generateSlug(slug) : generateSlug(trimmedName);

    // Check duplicate name (case-insensitive)
    const existingName = await BlogCategory.findOne({
      name: { $regex: new RegExp(`^${escapeRegex(trimmedName)}$`, "i") },
    });
    if (existingName) {
      return res.status(400).json({
        success: false,
        message: `Category "${trimmedName}" already exists.`,
      });
    }

    // Check duplicate slug
    const existingSlug = await BlogCategory.findOne({ slug: finalSlug });
    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: `Slug "${finalSlug}" is already in use. Please choose a different slug.`,
      });
    }

    const category = await BlogCategory.create({
      name: trimmedName,
      slug: finalSlug,
      description: description ? description.trim() : "",
      status: status || "Active",
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      return res.status(400).json({
        success: false,
        message: `A category with this ${field} already exists.`,
      });
    }
    next(err);
  }
};

/*
 * PUT /api/blog-categories/:id
 */
exports.updateCategory = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid category ID." });
    }

    const category = await BlogCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    const { name, slug, description, status, order } = req.body;

    if (name !== undefined) {
      const trimmedName = name.trim();
      if (!trimmedName) {
        return res.status(400).json({ success: false, message: "Category name cannot be empty." });
      }

      // Check duplicate name with other categories
      const existingName = await BlogCategory.findOne({
        _id: { $ne: req.params.id },
        name: { $regex: new RegExp(`^${escapeRegex(trimmedName)}$`, "i") },
      });
      if (existingName) {
        return res.status(400).json({
          success: false,
          message: `Category "${trimmedName}" already exists.`,
        });
      }

      category.name = trimmedName;

      // If slug was not explicitly provided in the update, keep or refresh slug
      if (slug === undefined) {
        // Keep slug or update if user wants
      }
    }

    if (slug !== undefined) {
      const finalSlug = slug.trim() ? generateSlug(slug) : generateSlug(category.name);
      const existingSlug = await BlogCategory.findOne({
        _id: { $ne: req.params.id },
        slug: finalSlug,
      });
      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: `Slug "${finalSlug}" is already in use.`,
        });
      }
      category.slug = finalSlug;
    }

    if (description !== undefined) {
      category.description = description.trim();
    }

    if (status !== undefined) {
      if (!["Active", "Inactive"].includes(status)) {
        return res.status(400).json({ success: false, message: "Status must be 'Active' or 'Inactive'." });
      }
      category.status = status;
    }

    if (order !== undefined) {
      category.order = Number(order) || 0;
    }

    await category.save();

    res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A category with this name or slug already exists.",
      });
    }
    next(err);
  }
};

/*
 * DELETE /api/blog-categories/:id
 */
exports.deleteCategory = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid category ID." });
    }

    const category = await BlogCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
