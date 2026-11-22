require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const careerRoutes = require("./Routes/careerRoutes");
const applicationRoutes = require("./Routes/applicationRoutes");
const contactRoutes = require("./Routes/contactRoutes");
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
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Prime Site Group API is running 🚀",
  });
});

// API routes
app.use("/api/careers", careerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contact", contactRoutes);
 

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