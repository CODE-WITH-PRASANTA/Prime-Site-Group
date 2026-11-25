require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const careerRoutes = require("./Routes/careerRoutes");
const applicationRoutes = require("./Routes/applicationRoutes");
const contactRoutes = require("./Routes/contactRoutes");
const blogCategoryRoutes = require("./Routes/blogCategoryRoutes");
const blogRoutes = require("./Routes/blogRoutes");
const serviceBookingRoutes = require("./Routes/serviceBookingRoutes");
const { notFound, errorHandler } = require("./Middleware/errorHandler");

const app = express();

// CORS configuration from .env
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman/curl (no origin) and listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Basic route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Prime Site Group API is running 🚀",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enquiry", contactRoutes);
app.use("/api/enquiries", contactRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/categories", blogCategoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/service-bookings", serviceBookingRoutes);
app.use("/api/service-booking", serviceBookingRoutes);
 

// Must come AFTER all routes
app.use(notFound);
app.use(errorHandler);

// Start server only after the DB is connected
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});