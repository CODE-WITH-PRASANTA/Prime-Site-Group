const mongoose = require("mongoose");
const Blog = require("../Model/Blog");
const deleteFile = require("../utils/deleteFile");

// Helper: Slug generator
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// Helper: Ensure unique slug
const getUniqueSlug = async (baseSlug, currentId = null) => {
  let slug = baseSlug || "blog";
  let count = 0;
  while (true) {
    const candidate = count === 0 ? slug : `${slug}-${count}`;
    const query = { slug: candidate };
    if (currentId) {
      query._id = { $ne: currentId };
    }
    const exists = await Blog.findOne(query);
    if (!exists) {
      return candidate;
    }
    count++;
  }
};

// Helper: Estimate read time
const estimateReadTime = (content = "") => {
  const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

/*
 * GET /api/blogs
 * Query params: search, category, status, author, page, limit, all
 */
exports.getBlogs = async (req, res, next) => {
  try {
    const { search = "", category = "", status = "", author = "", all = "" } = req.query;

    const filter = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    if (author && author !== "All") {
      filter.author = author;
    }

    if (search.trim()) {
      const rx = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [
        { title: rx },
        { shortDescription: rx },
        { description: rx },
        { category: rx },
        { author: rx },
        { tags: rx },
      ];
    }

    // Unlimited list (for sitemaps or compact selections)
    if (all === "true" || req.query.limit === "0") {
      const blogs = await Blog.find(filter).sort({ createdAt: -1 });
      return res.json({
        success: true,
        data: blogs,
        total: blogs.length,
      });
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));

    const [total, blogs, publishedCount, draftCount] = await Promise.all([
      Blog.countDocuments(filter),
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Blog.countDocuments({ status: "Published" }),
      Blog.countDocuments({ status: "Draft" }),
    ]);

    res.json({
      success: true,
      data: blogs,
      counts: {
        total: publishedCount + draftCount,
        published: publishedCount,
        draft: draftCount,
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
 * GET /api/blogs/:idOrSlug
 */
exports.getBlogByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    let blog = null;
    if (isValidId(idOrSlug)) {
      blog = await Blog.findById(idOrSlug);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: idOrSlug });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found." });
    }

    // Increment view count atomically
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

/*
 * POST /api/blogs
 */
exports.createBlog = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      category,
      shortDescription,
      description,
      tags,
      author,
      location,
      status,
      readTime,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Blog title is required." });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({ success: false, message: "Category is required." });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({ success: false, message: "Description/content is required." });
    }

    // Parse tags
    let parsedTags = [];
    if (Array.isArray(tags)) {
      parsedTags = tags;
    } else if (typeof tags === "string") {
      parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
    }

    // Handle image file or string
    let imageName = "";
    if (req.files?.image?.[0]?.filename) {
      imageName = req.files.image[0].filename;
    } else if (req.file?.filename) {
      imageName = req.file.filename;
    } else if (typeof req.body.image === "string") {
      imageName = req.body.image;
    }

    // Generate unique slug
    const baseSlug = generateSlug(slug || title);
    const finalSlug = await getUniqueSlug(baseSlug);

    // Compute read time
    const calculatedReadTime = readTime?.trim() || estimateReadTime(description);

    const blog = await Blog.create({
      title: title.trim(),
      slug: finalSlug,
      category: category.trim(),
      shortDescription: shortDescription ? shortDescription.trim() : "",
      description: description.trim(),
      tags: parsedTags,
      author: author ? author.trim() : "Admin",
      location: location ? location.trim() : "",
      image: imageName,
      readTime: calculatedReadTime,
      status: status || "Published",
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (err) {
    // If image was uploaded but db save failed, clean up file
    if (req.files?.image?.[0]?.filename) {
      deleteFile(req.files.image[0].filename);
    }
    next(err);
  }
};

/*
 * PUT /api/blogs/:id
 */
exports.updateBlog = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID." });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found." });
    }

    const {
      title,
      slug,
      category,
      shortDescription,
      description,
      tags,
      author,
      location,
      status,
      readTime,
    } = req.body;

    if (title !== undefined) {
      blog.title = title.trim();
    }

    if (slug !== undefined && slug.trim()) {
      const baseSlug = generateSlug(slug);
      blog.slug = await getUniqueSlug(baseSlug, blog._id);
    } else if (title !== undefined && !blog.slug) {
      blog.slug = await getUniqueSlug(generateSlug(title), blog._id);
    }

    if (category !== undefined) {
      blog.category = category.trim();
    }

    if (shortDescription !== undefined) {
      blog.shortDescription = shortDescription.trim();
    }

    if (description !== undefined) {
      blog.description = description.trim();
      if (!readTime) {
        blog.readTime = estimateReadTime(blog.description);
      }
    }

    if (readTime !== undefined) {
      blog.readTime = readTime.trim();
    }

    if (tags !== undefined) {
      if (Array.isArray(tags)) {
        blog.tags = tags;
      } else if (typeof tags === "string") {
        blog.tags = tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }

    if (author !== undefined) {
      blog.author = author.trim();
    }

    if (location !== undefined) {
      blog.location = location.trim();
    }

    if (status !== undefined) {
      blog.status = status;
    }

    // Handle new image upload
    if (req.files?.image?.[0]?.filename || req.file?.filename) {
      const newImage = (req.files?.image?.[0]?.filename || req.file?.filename);
      // Remove old local image if exists
      if (blog.image && !blog.image.startsWith("http")) {
        deleteFile(blog.image);
      }
      blog.image = newImage;
    } else if (req.body.image !== undefined && typeof req.body.image === "string") {
      blog.image = req.body.image;
    }

    await blog.save();

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (err) {
    if (req.files?.image?.[0]?.filename) {
      deleteFile(req.files.image[0].filename);
    }
    next(err);
  }
};

/*
 * DELETE /api/blogs/:id
 */
exports.deleteBlog = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID." });
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found." });
    }

    // Delete image from disk if local
    if (blog.image && !blog.image.startsWith("http")) {
      deleteFile(blog.image);
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
