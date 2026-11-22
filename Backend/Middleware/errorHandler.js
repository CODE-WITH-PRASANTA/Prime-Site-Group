exports.notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

exports.errorHandler = (err, _req, res, _next) => {
  // Mongoose validation errors -> { field: message }
  if (err.name === "ValidationError") {
    const errors = {};
    Object.values(err.errors).forEach((e) => {
      errors[e.path] = e.message;
    });
    return res.status(400).json({ success: false, message: "Validation failed.", errors });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid value provided." });
  }

  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server error.",
  });
};