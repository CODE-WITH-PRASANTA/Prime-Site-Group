const express = require("express");
const upload = require("../Middleware/multer");
const {
  getBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../Controller/blogController");

const router = express.Router();

router.route("/").get(getBlogs).post(upload, createBlog);

router
  .route("/:idOrSlug")
  .get(getBlogByIdOrSlug)
  .put(upload, updateBlog)
  .delete(deleteBlog);

module.exports = router;
